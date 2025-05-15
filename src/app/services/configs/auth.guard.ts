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
        'ROLE_ADMIN',
        'ROLE_RH',
        'ROLE_GERENTE_GERAL',
        'ROLE_GERENTE',
        'ROLE_SUPERVISOR',
        'ROLE_VENDEDOR',
        'ROLE_COLABORADOR',
      ];
      if (permissoesPermitidas.includes(role)) {
        return true;
      }
    }
    
    this.router.navigate(['/login']);
    return false;
  }
}
