import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Permissao } from 'src/app/login/permissao';
import { Usuario } from 'src/app/login/usuario';
import { GraficosService } from 'src/app/services/administrativo/graficos.service';
import { AuthService } from 'src/app/services/configs/auth.service';
import { MotivationalMessagesService } from 'src/app/services/motivational-messages.service';
import { ServicesApisService } from 'src/app/services/services-apis.service';
import { Cargo } from '../../Administrativo/funcionarios/enums/cargo';
import { CargoDescricoes } from 'src/app/sistema/Administrativo/funcionarios/enums/cargo-descricoes';

@Component({
  selector: 'app-painel-rh',
  templateUrl: './painel-rh.component.html',
  styleUrls: ['./painel-rh.component.css'],
})
export class PainelRhComponent implements OnInit {
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

  quantidadeCursos: number = 0;

  public seriesFuncionariosPorLoja: any[] = [];
  public categoriesFuncionariosPorLoja: string[] = [];

  tooltipFuncionario = (val: number) => `${val} funcionários`;
  public seriesEscolaridade: number[] = [];
  public labelsEscolaridade: string[] = [];

  public seriesGenero: number[] = [];
  public labelsGenero: string[] = [];

  public seriesOrcamentoDepartamento: any[] = [];
  public categoriesOrcamentoDepartamento: string[] = [];

  public seriesFaixaEtaria: number[] = [];
  public labelsFaixaEtaria: string[] = [
    'Até 21 anos',
    'De 22 a 28 anos',
    'De 29 a 35 anos',
    'De 36 a 42 anos',
    'De 43 a 49 anos',
    'De 50 a 56 anos',
    'Acima de 57 anos',
  ];

  public seriesCargo: number[] = [];
  public labelsCargo: string[] = [];

  public seriesTempoEmpresa: any[] = [];
  public categoriesTempoEmpresa: string[] = [];

  public seriesEstadoCivil: number[] = [];
  public labelsEstadoCivil: string[] = [];

  public seriesEtnia: number[] = [];
  public labelsEtnia: string[] = [];

  public Permissao = Permissao;
  cargoUsuario!: Permissao;

  constructor(
    private apiService: ServicesApisService,
    private motivationalMessagesService: MotivationalMessagesService,
    private cdr: ChangeDetectorRef,
    private usuarioService: AuthService,
    private graficosService: GraficosService
  ) {}

  //teste
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

    this.carregarGraficoEscolaridade();
    this.carregarGraficoGenero();
    this.carregarGraficoFuncionariosPorLoja();
    this.carregarGraficoFaixaEtaria();
    this.carregarGraficoCargo();
    this.carregarGraficoTempoEmpresa();
    this.carregarGraficoEstadoCivil();
    this.carregarGraficoEtnia();
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

  carregarGraficoEscolaridade(): void {
    this.graficosService.getColaboradoresPorEscolaridade().subscribe((data) => {
      this.labelsEscolaridade = Object.keys(data);
      this.seriesEscolaridade = Object.values(data);
    });
  }

  carregarGraficoFuncionariosPorLoja(): void {
    this.graficosService.getColaboradoresPorLoja().subscribe((data) => {
      this.categoriesFuncionariosPorLoja = Object.keys(data);
      this.seriesFuncionariosPorLoja = [
        {
          name: 'Funcionarios',
          data: Object.values(data),
        },
      ];
    });
  }

  carregarGraficoGenero(): void {
    this.graficosService.getColaboradoresPorGenero().subscribe((data) => {
      this.labelsGenero = Object.keys(data);
      this.seriesGenero = Object.values(data);
    });
  }

  carregarGraficoOrcamentoDepartamento(): void {
    this.graficosService.getOrcamentoPorDepartamento().subscribe((data) => {
      this.categoriesOrcamentoDepartamento = Object.keys(data);
      this.seriesOrcamentoDepartamento = [
        {
          name: 'Orçamento (R$)',
          data: Object.values(data),
        },
      ];
    });
  }

  carregarGraficoFaixaEtaria(): void {
    this.graficosService.getFuncionariosPorFaixaEtaria().subscribe((data) => {
      this.labelsFaixaEtaria = data.map((item) => item.faixaEtaria);
      this.seriesFaixaEtaria = data.map((item) => item.quantidade);
    });
  }

  carregarGraficoCargo(): void {
    this.graficosService.getFuncionariosPorCargo().subscribe((data) => {
      this.labelsCargo = data.map(
        (item) =>
          CargoDescricoes[item.cargo as keyof typeof CargoDescricoes] ||
          item.cargo
      );
      this.seriesCargo = data.map((item) => item.quantidade);
    });
  }

  carregarGraficoTempoEmpresa(): void {
    const categoriasFixas = [
      'Até 1 ano',
      'De 1 a 2 anos',
      'De 2 a 3 anos',
      'De 3 a 4 anos',
      'De 5 a 10 anos',
      'Mais de 10 anos',
    ];

    this.graficosService.getFuncionariosPorTempoEmpresa().subscribe((data) => {
      const map = new Map(
        data.map((item) => [item.tempoDeEmpresa, item.quantidade])
      );
      this.categoriesTempoEmpresa = categoriasFixas;
      this.seriesTempoEmpresa = [
        {
          name: 'Funcionarios',
          data: categoriasFixas.map((cat) => map.get(cat) ?? 0),
        },
      ];
    });
  }

  carregarGraficoEstadoCivil(): void {
    this.graficosService.getFuncionariosPorEstadoCivil().subscribe((data) => {
      this.labelsEstadoCivil = data.map((item) => item.estadoCivil);
      this.seriesEstadoCivil = data.map((item) => item.quantidade);
    });
  }

  carregarGraficoEtnia(): void {
    this.graficosService.getFuncionariosPorEtnia().subscribe((data) => {
      this.labelsEtnia = data.map((item) => item.etnia);
      this.seriesEtnia = data.map((item) => item.quantidade);
    });
  }
}
