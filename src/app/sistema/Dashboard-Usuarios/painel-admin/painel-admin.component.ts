import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServicesApisService } from 'src/app/services/services-apis.service';
import { MotivationalMessagesService } from 'src/app/services/motivational-messages.service';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Usuario } from 'src/app/login/usuario';
import * as ApexCharts from 'apexcharts';
import { GraficosService } from 'src/app/services/administrativo/graficos.service';

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
      this.graficosService.getColaboradoresPorEscolaridade().subscribe((data) => {
        this.renderChartEscolaridade(data);
      });
      
      this.graficosService.getColaboradoresPorGenero().subscribe((data) => {
        this.renderChartGenero(data);
      });
      
      this.graficosService.getColaboradoresPorLoja().subscribe((data) => {
        this.renderChartPorLoja(data);
      });
    this.usuarioService.obterPerfilUsuario().subscribe(
      (usuario) => {
        this.usuario = usuario;
        this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
        console.log('Perfil do usuário:', usuario);
      },
      (error) => console.error('Erro ao obter perfil do usuário:', error)
    );
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

  renderChartGenero(data: Record<string, number>) {
    const labels = Object.keys(data);
    const values = Object.values(data);
  
    const options = {
      chart: {
        type: 'pie',
        height: 350,
        width: '100%',
      },
      title: {
        text: 'Colaboradores por Gênero',
        align: 'center',
      },
      series: values,
      labels: labels,
      theme: {
        palette: 'palette2',
      },
      responsive: [
        {
          breakpoint: 980,
          options: {
            chart: {
              width: 250,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  
    const chart = new ApexCharts(
      document.querySelector('#chartGenero'),
      options
    );
    chart.render();
  }
  
  
  renderChartPorLoja(data: Record<string, number>) {
    const labels = Object.keys(data);
    const values = Object.values(data);
  
    const options = {
      chart: {
        type: 'bar',
        height: 350,
        width: '100%',
      },
      title: {
        text: 'Colaboradores por Loja',
        align: 'center',
      },
      series: [
        {
          name: 'Colaboradores',
          data: values,
        },
      ],
      xaxis: {
        categories: labels,
      },
      theme: {
        palette: 'palette4',
      },
    };
  
    const chart = new ApexCharts(
      document.querySelector('#chartColaboradoresPorLoja'),
      options
    );
    chart.render();
  }
  
  renderChartEscolaridade(data: Record<string, number>) {
    const labels = Object.keys(data);
    const values = Object.values(data);
  
    const options = {
      chart: {
        type: 'donut',
        height: 350,
        width: '100%',
      },
      title: {
        text: 'Colaboradores por Escolaridade',
        align: 'center',
      },
      series: values,
      labels: labels,
      theme: {
        palette: 'palette8',
      },
      responsive: [
        {
          breakpoint: 980,
          options: {
            chart: {
              width: 250,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  
    const chart = new ApexCharts(
      document.querySelector('#chartEscolaridade'),
      options
    );
    chart.render();
  }
  
  
}