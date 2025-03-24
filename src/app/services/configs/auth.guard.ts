import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
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

      if (
        role === 'ROLE_ADMIN' ||
        role === 'ROLE_RH' ||
        role === 'ROLE_GERENTE_GERAL' ||
        role === 'ROLE_GERENTE' ||
        role === 'ROLE_SUPERVISOR' ||
        role === 'ROLE_VENDEDOR' ||
        role === 'ROLE_COLABORADOR'

      ) {
        return true;
      }
    }
    this.router.navigate(['/forbidden']);
    return false;
  }
}
