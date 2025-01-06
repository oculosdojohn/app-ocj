import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServicesApisService {
  private adviceApiUrl = 'https://api.adviceslip.com/advice'; // API original
  private translateApiUrl = 'https://api.mymemory.translated.net/get'; // API de tradução gratuita

  constructor(private http: HttpClient) {}

  fetchMotivationalMessage(): Observable<string> {
    return this.http.get<any>(this.adviceApiUrl).pipe(
      map((response) => response.slip.advice), // Extrai a mensagem em inglês
      switchMap((message) => this.translateToPortuguese(message)) // Traduz para português
    );
  }

  private translateToPortuguese(text: string): Observable<string> {
    const url = `${this.translateApiUrl}?q=${encodeURIComponent(
      text
    )}&langpair=en|pt`;
    return this.http.get<any>(url).pipe(
      map((response) => response.responseData.translatedText) // Obtém o texto traduzido
    );
  }
}
