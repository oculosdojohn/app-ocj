import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const usuario = this.authService.getUsuarioAutenticado();

    if (usuario) {
      const role = usuario.permissao;

      const permissoesPermitidas = [
        'ADMIN',
        'RH',
        'GERENTE_GERAL',
        'GERENTE',
        'SUPERVISOR',
        'VENDEDOR',
        'COLABORADOR',
      ];
      if (permissoesPermitidas.includes(role)) {
        return true;
      }
    }
    
    this.router.navigate(['/login']);
    return false;
  }
}
