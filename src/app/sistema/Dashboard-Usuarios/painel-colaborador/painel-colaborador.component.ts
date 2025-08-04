import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Permissao } from 'src/app/login/permissao';
import { Usuario } from 'src/app/login/usuario';
import { AuthService } from 'src/app/services/configs/auth.service';
import { MotivationalMessagesService } from 'src/app/services/motivational-messages.service';
import { ServicesApisService } from 'src/app/services/services-apis.service';
import { Router } from '@angular/router';
import { Modulos } from '../../Servicos/cursos/enums/modulos';
import { ModulosDescricao } from '../../Servicos/cursos/enums/modulos-descricao';

@Component({
  selector: 'app-painel-colaborador',
  templateUrl: './painel-colaborador.component.html',
  styleUrls: ['./painel-colaborador.component.css'],
})
export class PainelColaboradorComponent implements OnInit {
  usuario: Usuario | null = null;
  weatherDescription: string = 'Carregando...';
  temperature: number = 0;
  iconUrl: string = '';
  windSpeed: number = 0;
  weatherData: any = {};
  motivationalMessage: { quote: string; author: string } = {
    quote: '',
    author: '',
  };

  public Permissao = Permissao;
  cargoUsuario!: Permissao;

  private moduloImagens: { [key in Modulos]: string } = {
    [Modulos.ONBOARDING]: 'assets/imgs/cursos-img/onboarding.png',
    [Modulos.HISTORIA_SUCESSO]: 'assets/imgs/cursos-img/historia-sucesso.png',
    [Modulos.PRINCIPIOS_OTICA]: 'assets/imgs/cursos-img/principios-otica.png',
    [Modulos.SCRIPT_VENDAS]: 'assets/imgs/cursos-img/script-vendas.png',
    [Modulos.CONSEGUIR_CLIENTES]:
      'assets/imgs/cursos-img/conseguir-clientes.png',
    [Modulos.CONSULTOR_ALTA_PERFORMANCE]:
      'assets/imgs/cursos-img/consultor-alta-performance.png',
    [Modulos.LIMPEZA_MANUTENCAO]:
      'assets/imgs/cursos-img/limpeza-manutencao.png',
    [Modulos.MANUTENCAO_OCULOS]: 'assets/imgs/cursos-img/manutencao-oculos.png',
    [Modulos.GARANTIA_PRODUTOS]: 'assets/imgs/cursos-img/garantia-produtos.png',
    [Modulos.EMBALAGEM_PADRAO]: 'assets/imgs/cursos-img/embalagem-padrao.png',
    [Modulos.ENTREGA_OCULOS_GRAU]: 'assets/imgs/cursos-img/entrega-oculos.png',
    [Modulos.PADROES_ATENDIMENTO]:
      'assets/imgs/cursos-img/padroes-atendimento.png',
    [Modulos.SSOTICA_SISTEMA_VENDAS]:
      'assets/imgs/cursos-img/ssotica-vendas.png',
    [Modulos.SSOTICA_CAIXA]: 'assets/imgs/cursos-img/ssotica-caixa.png',
    [Modulos.EU_SOU_VENDEDOR]: 'assets/imgs/cursos-img/eu-sou-vendedor.png',
    [Modulos.INTELIGENCIA_EMOCIONAL]:
      'assets/imgs/cursos-img/inteligencia-emocional.png',
  };

  modulos = Object.keys(Modulos).map((key) => ({
    value: Modulos[key as keyof typeof Modulos],
    description: ModulosDescricao[Modulos[key as keyof typeof Modulos]],
    slug: this.generateSlug(
      ModulosDescricao[Modulos[key as keyof typeof Modulos]]
    ),
    image: this.moduloImagens[Modulos[key as keyof typeof Modulos]],
    descriptionText: this.getDescriptionText(
      Modulos[key as keyof typeof Modulos]
    ),
  }));

  cursosFinalizados: string[] = [];

  constructor(
    private apiService: ServicesApisService,
    private motivationalMessagesService: MotivationalMessagesService,
    private cdr: ChangeDetectorRef,
    private usuarioService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getWeatherForCurrentLocation();
    this.motivationalMessage =
      this.motivationalMessagesService.getRandomMessage();
    this.usuarioService.obterPerfilUsuario().subscribe(
      (usuario) => {
        this.usuario = usuario;
        this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
        console.log('Perfil do usuário:', usuario);
      },
      (error) => console.error('Erro ao obter perfil do usuário:', error)
    );
  }

  visualizarCursos(): void {
    this.router.navigate(['/usuario/cursos-disponiveis']);
  }

  getWeatherForRussas(): void {
    this.apiService.fetchWeatherForRussas().subscribe((data) => {
      this.weatherData = data;
      console.log(this.weatherData);
      this.updateWeatherInfo();
    });
  }

  getWeatherForCurrentLocation(): void {
    this.apiService.fetchWeatherForCurrentLocation().subscribe(
      (data) => {
        this.weatherData = data;
        console.log(this.weatherData);
        this.updateWeatherInfo();
      },
      (error) => {
        console.error('Error getting location', error);
        this.getWeatherForRussas();
      }
    );
  }

  getWeatherForLocation(lat: number, lon: number): void {
    this.apiService.fetchWeather(lat, lon).subscribe((data) => {
      this.weatherData = data;
      console.log(this.weatherData);
      this.updateWeatherInfo();
    });
  }

  updateWeatherInfo(): void {
    if (this.weatherData) {
      this.weatherDescription = this.weatherData.weather[0].description;
      this.temperature = Math.round(this.weatherData.main.temp);
      this.iconUrl = `http://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}.png`;
      this.windSpeed = this.weatherData.wind.speed;
      this.cdr.detectChanges();
    }
  }

  generateSlug(text: string): string {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  getDescriptionText(modulo: Modulos): string {
    const descriptions: { [key in Modulos]: string } = {
      [Modulos.ONBOARDING]:
        'Introdução essencial para novos colaboradores! Entenda a cultura, os processos e as melhores práticas.',
      [Modulos.HISTORIA_SUCESSO]:
        'Inspire-se com histórias reais de sucesso no setor óptico e descubra os segredos para crescer na área.',
      [Modulos.PRINCIPIOS_OTICA]:
        'Aprenda os fundamentos da óptica para oferecer um atendimento mais técnico e qualificado.',
      [Modulos.SCRIPT_VENDAS]:
        'Domine um roteiro de vendas eficaz para abordar clientes com segurança e aumentar suas conversões.',
      [Modulos.CONSEGUIR_CLIENTES]:
        'Descubra estratégias para atrair, conquistar e fidelizar clientes, impulsionando suas vendas.',
      [Modulos.CONSULTOR_ALTA_PERFORMANCE]:
        'Desenvolva habilidades essenciais para se tornar um consultor de sucesso e se destacar no mercado.',
      [Modulos.LIMPEZA_MANUTENCAO]:
        'Aprenda a higienizar e manter produtos ópticos, garantindo qualidade e satisfação do cliente.',
      [Modulos.MANUTENCAO_OCULOS]:
        'Domine técnicas de ajuste e reparo de óculos para oferecer um serviço diferenciado e agregar valor.',
      [Modulos.GARANTIA_PRODUTOS]:
        'Entenda as políticas de garantia e aprenda a aplicá-las de forma transparente e profissional.',
      [Modulos.EMBALAGEM_PADRAO]:
        'Saiba como embalar produtos com segurança e elegância, proporcionando uma experiência premium ao cliente.',
      [Modulos.ENTREGA_OCULOS_GRAU]:
        'Garanta uma entrega segura e qualificada de óculos de grau, elevando a experiência do cliente.',
      [Modulos.PADROES_ATENDIMENTO]:
        'Aprimore sua abordagem com técnicas e boas práticas que encantam e fidelizam clientes.',
      [Modulos.SSOTICA_SISTEMA_VENDAS]:
        'Aprenda a utilizar o sistema de vendas SSÓtica para otimizar seu processo comercial.',
      [Modulos.SSOTICA_CAIXA]:
        'Domine o fluxo de caixa da SSÓtica para garantir operações seguras e eficientes.',
      [Modulos.EU_SOU_VENDEDOR]:
        'Fortaleça sua identidade como vendedor e aprimore suas habilidades para se destacar no mercado.',
      [Modulos.INTELIGENCIA_EMOCIONAL]:
        'Desenvolva inteligência emocional para lidar com desafios, melhorar relacionamentos e alcançar alta performance.',
    };

    return descriptions[modulo];
  }

  get cursosRecomendados() {
    const naoFinalizados = this.modulos.filter(
      (m) => !this.cursosFinalizados.includes(m.value)
    );
    // Pega os 3 primeiros não finalizados
    return naoFinalizados.slice(0, 3);
  }

  navegarParaModulo(modulo: string): void {
    const moduloSlug = this.modulos.find((m) => m.value === modulo)?.slug;
    if (moduloSlug) {
      this.router.navigate(['/usuario/curso', moduloSlug]);
    }
  }
}
