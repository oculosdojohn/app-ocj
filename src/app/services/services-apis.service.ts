import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicesApisService {
  apiURL: string = environment.apiURLBase + '/api/clima';

  constructor(private http: HttpClient) {}

  fetchWeather(lat: number, lon: number): Observable<any> {
    const url = `${this.apiURL}?lat=${lat}&lon=${lon}`;
    return this.http.get<any>(url).pipe(
      map((response) => response),
      catchError((error: HttpErrorResponse) => {
        const msg = this.processarErro(error, 'Erro ao buscar dados do clima.');
        return throwError(() => new Error(msg));
      })
    );
  }

  fetchWeatherForRussas(): Observable<any> {
    const lat = -4.9404;
    const lon = -37.9756;
    return this.fetchWeather(lat, lon);
  }

  fetchWeatherForCurrentLocation(): Observable<any> {
    return new Observable(observer => {
      if (!navigator.geolocation) {
        observer.error('Geolocalização não é suportada pelo navegador.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log(`Localização detectada: lat=${lat}, lon=${lon}`);

          this.fetchWeather(lat, lon).subscribe(
            data => {
              observer.next(data);
              observer.complete();
            },
            error => {
              console.error('Erro na requisição à API do clima:', error);
              observer.error('Erro ao buscar dados do clima.');
            }
          );
        },
        error => {
          console.error('Erro ao obter geolocalização:', error);
          observer.error('Permissão de localização negada ou erro.');
        }
      );
    });
  }

  private processarErro(error: HttpErrorResponse, mensagemPadrao: string): string {
    console.error('Erro bruto recebido da API do clima:', error);

    let errorMessage = mensagemPadrao;

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro de rede: ${error.error.message}`;
    } else if (typeof error.error === 'string') {
      errorMessage = error.error;
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    }

    console.error('Mensagem de erro processada:', errorMessage);
    return errorMessage;
  }
}
