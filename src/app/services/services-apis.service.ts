import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServicesApisService {
  
  private openweathermapWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private openweathermapKey = 'dd3ce94aa0b74ec4b1cc3086d70a3c0d';

  constructor(private http: HttpClient) {}

  /**
   * Busca o clima diretamente para Russas, Ceará, Brasil.
   */
  fetchWeatherForRussas(): Observable<any> {
    const lat = -4.9404; // Latitude de Russas
    const lon = -37.9756; // Longitude de Russas
    const url = `${this.openweathermapWeatherUrl}?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${this.openweathermapKey}`;
    return this.http.get<any>(url);
  }
}
