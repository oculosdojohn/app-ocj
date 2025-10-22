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
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private readonly publicApiPaths: RegExp[] = [
    /^\/auth\/login$/,
    /^\/auth\/refresh$/,
    /^\/auth\/forgot-password$/,
    /^\/public(\/.*)?$/,
    /^\/reset-password$/,
  ];

  constructor(
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.obterToken();
    const isApiRequest = this.isApiUrl(req.url);

    const pathname = this.getPathname(req.url);
    const isPublicApiPath = pathname
      ? this.publicApiPaths.some(rx => rx.test(pathname))
      : false;

    const useCookies = !!environment.useCookieAuth;

    let request = req;

    if (isApiRequest) {
      if (!isPublicApiPath && token && !useCookies) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
      }

      if (useCookies && request.withCredentials !== true) {
        request = request.clone({ withCredentials: true });
      }
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 419) {
            this.auth.encerrarSessao();
            this.snack.open('Sessão expirada. Faça login novamente.', 'OK', { duration: 10000 });
            this.router.navigate(['/login'], { queryParams: { reason: 'session_expired' } });
          }
        }
        return throwError(() => err);
      })
    );
  }

  private isApiUrl(url: string): boolean {
    try {
      const absolute = new URL(url, window.location.origin);
      const base = new URL(environment.apiURLBase, window.location.origin);
      return absolute.origin === base.origin && absolute.pathname.startsWith(base.pathname);
    } catch {
      return false;
    }
  }

  private getPathname(url: string): string | null {
    try {
      const u = new URL(url, window.location.origin);
      const base = new URL(environment.apiURLBase, window.location.origin);
      return u.origin === base.origin && u.pathname.startsWith(base.pathname)
        ? u.pathname.slice(base.pathname.length) || '/'
        : u.pathname;
    } catch {
      return null;
    }
  }
}
