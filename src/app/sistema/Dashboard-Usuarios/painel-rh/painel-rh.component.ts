import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Permissao } from 'src/app/login/permissao';
import { Usuario } from 'src/app/login/usuario';
import { GraficosService } from 'src/app/services/administrativo/graficos.service';
import { AuthService } from 'src/app/services/configs/auth.service';
import { MotivationalMessagesService } from 'src/app/services/motivational-messages.service';
import { ServicesApisService } from 'src/app/services/services-apis.service';

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
    this.carregarGraficoOrcamentoDepartamento();
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
}
