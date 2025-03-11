import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServicesApisService {
  private openweathermapWeatherUrl ='https://api.openweathermap.org/data/2.5/weather';
  private openweathermapKey = 'dd3ce94aa0b74ec4b1cc3086d70a3c0d';

  constructor(private http: HttpClient) {}

  fetchWeather(lat: number, lon: number): Observable<any> {
    const url = `${this.openweathermapWeatherUrl}?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${this.openweathermapKey}`;
    return this.http.get<any>(url);
  }

  fetchWeatherForRussas(): Observable<any> {
    const lat = -4.9404;
    const lon = -37.9756;
    return this.fetchWeather(lat, lon);
  }

  fetchWeatherForCurrentLocation(): Observable<any> {
    return new Observable(observer => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.fetchWeather(lat, lon).subscribe(
            data => {
              observer.next(data);
              observer.complete();
            },
            error => {
              observer.error(error);
            }
          );
        }, error => {
          observer.error(error);
        });
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }
}
