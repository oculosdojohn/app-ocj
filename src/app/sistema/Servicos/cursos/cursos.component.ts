import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modulos } from '../cursos/enums/modulos';
import { ModulosDescricao } from '../cursos/enums/modulos-descricao';
import { Permissao } from 'src/app/login/permissao';
import { AuthService } from 'src/app/services/configs/auth.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent implements OnInit {
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

  paginaAtual: number = 1;
  itensPorPagina: number = 6;

  public Permissao = Permissao;
  public cargoUsuario!: Permissao;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // já busca o perfil e define o cargo
    this.authService.obterPerfilUsuario().subscribe((usuario) => {
      this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
    });
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
  }

  cadastrarAula(): void {
    this.router.navigate(['/usuario/cadastro-de-aulas']);
  }

  cadastrarQuizz(): void {
    this.router.navigate(['/usuario/cadastro-quizz']);
  }

  buscarAulas(): void {
    this.router.navigate(['/usuario/buscar-aulas']);
  }

  get modulosPaginados() {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    return this.modulos.slice(inicio, inicio + this.itensPorPagina);
  }

  get totalItens() {
    return this.modulos.length;
  }

  mudarPagina(numeroPagina: number) {
    this.paginaAtual = numeroPagina;
  }

  navegarParaModulo(modulo: string): void {
    const moduloSlug = this.modulos.find((m) => m.value === modulo)?.slug;
    if (moduloSlug) {
      this.router.navigate(['/usuario/curso', moduloSlug]);
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

  get rotaDashboard(): string {
    if (this.cargoUsuario === Permissao.ADMIN) return '/dashboard-admin';
    if (this.cargoUsuario === Permissao.RH) return '/dashboard-rh';
    if (this.cargoUsuario === Permissao.GERENTE) return '/dashboard-gerente';
    if (
      this.cargoUsuario === Permissao.COLABORADOR ||
      this.cargoUsuario === Permissao.VENDEDOR
    )
      return '/dashboard-colaborador';
    return '/login';
  }
}
