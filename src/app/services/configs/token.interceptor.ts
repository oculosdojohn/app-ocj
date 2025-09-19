import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');

    const rotasPublicas = ['/reset-password', '/login'];

    // verifica se a requisição é para uma rota pública
    const isPublicRoute = rotasPublicas.some((rota) =>
      request.url.includes(rota)
    );

    if (token && !isPublicRoute) {
      const requestComToken = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(requestComToken);
    }

    return next.handle(request);
  }
}
