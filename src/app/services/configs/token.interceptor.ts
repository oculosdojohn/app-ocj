import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private readonly rotasPublicas = ['/reset-password', '/login', '/auth', '/public'];

  constructor(
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.obterToken();
    const isPublicRoute = this.rotasPublicas.some((rota) => request.url.includes(rota));

    const req = token && !isPublicRoute
      ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : request;

    return next.handle(req).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 419) {
            this.auth.encerrarSessao();
            this.snack.open('Sessão expirada. Faça login novamente.', 'OK', {
              duration: 10000,
            });
            this.router.navigate(['/login'], {
              queryParams: { reason: 'session_expired' },
            });
          }
        }
        return throwError(() => err);
      })
    );
  }
}