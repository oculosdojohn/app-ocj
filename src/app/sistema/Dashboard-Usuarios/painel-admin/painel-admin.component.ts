import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServicesApisService } from 'src/app/services/services-apis.service';
import { MotivationalMessagesService } from 'src/app/services/motivational-messages.service';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Usuario } from 'src/app/login/usuario';
import * as ApexCharts from 'apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions
} from "ng-apexcharts";

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
  motivationalMessage: { quote: string, author: string } = { quote: '', author: '' };

  constructor(
    private apiService: ServicesApisService,
    private motivationalMessagesService: MotivationalMessagesService,
    private cdr: ChangeDetectorRef,
    private usuarioService: AuthService
  ) {}

  ngOnInit(): void {
    this.getWeatherForCurrentLocation();
    this.motivationalMessage = this.motivationalMessagesService.getRandomMessage();
    this.renderChartAdmissao();
    this.renderChartDemissao();
    this.renderChartEscolaridade();
    this.usuarioService.obterPerfilUsuario().subscribe(
      (usuario) => {
        this.usuario = usuario;
        console.log('Perfil do usuário:', usuario);
      },
      (error) => {
        console.error('Erro ao obter perfil do usuário:', error);
      }
    );
  }

  getWeatherForRussas(): void {
    this.apiService.fetchWeatherForRussas().subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData);
      this.updateWeatherInfo();
    });
  }

  getWeatherForCurrentLocation(): void {
    this.apiService.fetchWeatherForCurrentLocation().subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData);
      this.updateWeatherInfo();
    }, error => {
      console.error('Error getting location', error);
      this.getWeatherForRussas();
    });
  }

  getWeatherForLocation(lat: number, lon: number): void {
    this.apiService.fetchWeather(lat, lon).subscribe(data => {
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

  // graficos
  renderChartAdmissao() {
      var options = {
        chart: {
          type: 'line',
          height: 350,
          width: '100%'
        },
        series: [{
          name: 'Admissões',
          data: [45, 5, 2, 50, 10, 60, 30, 91, 125, 160, 200, 150]
        }],
        xaxis: {
          categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        },
        theme: {
          palette: 'palette3'
        }
      };
  
      var chart = new ApexCharts(document.querySelector('#chartAdmissao'), options);
      chart.render();
    }
  
    renderChartDemissao() {
      var options = {
        chart: {
          type: 'line',
          height: 350,
          width: '100%'
        },
        series: [{
          name: 'Demissões',
          data: [1, 5, 2, 50, 10, 60, 30, 91, 125, 160, 100, 50]
        }],
        xaxis: {
          categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        },
        theme: {
          palette: 'palette10'
        }
      };
  
      var chart = new ApexCharts(document.querySelector('#chartDemissao'), options);
      chart.render();
    }

    renderChartEscolaridade() {
      var options = {
        chart: {
          type: 'donut',
          height: 350,
          width: '100%'
        },
        series: [44, 55, 13],
        labels: ['Fundamental completo', 'Médio completo', 'Superior completo'],
        theme: {
          palette: 'palette8'
        },
        responsive: [
          {
            breakpoint: 980,
            options: {
              chart: {
                width: 250
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
  
      var chart = new ApexCharts(document.querySelector('#chartEscolaridade'), options);
      chart.render();
    }
}
