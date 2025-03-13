import { Component, OnInit } from '@angular/core';
import { ServicesApisService } from 'src/app/services/services-apis.service';
import { MotivationalMessagesService } from 'src/app/services/motivational-messages.service';

@Component({
  selector: 'app-painel-admin',
  templateUrl: './painel-admin.component.html',
  styleUrls: ['./painel-admin.component.css'],
})
export class PainelAdminComponent implements OnInit {
  weatherDescription: string = 'Carregando...';
  temperature: number = 0;
  iconUrl: string = '';
  windSpeed: number = 0;
  weatherData: any;
  motivationalMessage: { quote: string, author: string } = { quote: '', author: '' };

  constructor(
    private apiService: ServicesApisService,
    private motivationalMessagesService: MotivationalMessagesService,
  ) {}

  ngOnInit(): void {
    this.getWeatherForCurrentLocation();
    this.motivationalMessage = this.motivationalMessagesService.getRandomMessage();
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
    }
  }
}
