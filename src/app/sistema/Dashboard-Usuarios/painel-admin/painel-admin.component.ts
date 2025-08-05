import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServicesApisService } from 'src/app/services/services-apis.service';
import { MotivationalMessagesService } from 'src/app/services/motivational-messages.service';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Usuario } from 'src/app/login/usuario';
import * as ApexCharts from 'apexcharts';
import { GraficosService } from 'src/app/services/administrativo/graficos.service';
import { Modulos } from '../../Servicos/cursos/enums/modulos';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
} from 'ng-apexcharts';
import { Permissao } from 'src/app/login/permissao';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-painel-admin',
  templateUrl: './painel-admin.component.html',
  styleUrls: ['./painel-admin.component.css'],
})
export class PainelAdminComponent implements OnInit {
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
  totalColaboradores: number = 0;
  totalLojas: number = 0;
  totalGestores: number = 0;

  public seriesFuncionariosPorLoja: any[] = [];
  public categoriesFuncionariosPorLoja: string[] = [];

  tooltipFuncionario = (val: number) => `${val} funcionários`;
  public seriesEscolaridade: number[] = [];
  public labelsEscolaridade: string[] = [];

  public seriesGenero: number[] = [];
  public labelsGenero: string[] = [];

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

    this.quantidadeCursos = Object.keys(Modulos).length;

    this.carregarGraficoEscolaridade();
    this.carregarGraficoGenero();
    this.carregarGraficoFuncionariosPorLoja();

    this.graficosService.getOrcamentoPorDepartamento().subscribe((data) => {
      this.renderChartOrcamentoDepartamento(data);
    });
    this.graficosService.getTotalColaboradores().subscribe((total) => {
      this.totalColaboradores = total;
    });

    this.graficosService.getTotalLojas().subscribe((total) => {
      this.totalLojas = total;
    });

    this.graficosService.getTotalGestores().subscribe((total) => {
      this.totalGestores = total;
    });
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

  renderChartOrcamentoDepartamento(data: Record<string, number>) {
    const labels = Object.keys(data);
    const values = Object.values(data);

    const options = {
      chart: {
        type: 'bar',
        height: 350,
        width: '100%',
      },
      title: {
        text: 'Orçamento por Departamento',
        align: 'center',
      },
      series: [
        {
          name: 'Orçamento (R$)',
          data: values,
        },
      ],
      xaxis: {
        categories: labels,
      },
      tooltip: {
        y: {
          formatter: (val: number) => `R$ ${val.toLocaleString('pt-BR')}`,
        },
      },
      theme: {
        palette: 'palette5',
      },
    };

    const chart = new ApexCharts(
      document.querySelector('#chartOrcamentoDepartamento'),
      options
    );
    chart.render();
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
}
