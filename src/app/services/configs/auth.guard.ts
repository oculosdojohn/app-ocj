import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
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
      const role = usuario.permissao; // Exemplo: 'ADMIN', 'RH', etc.

      const permissoesRota = route.data['roles'] as string[] | undefined;

      // Se a rota tem restrição de perfil, verifica se o perfil do usuário está na lista
      if (permissoesRota) {
        if (permissoesRota.includes(role)) {
          return true;
        } else {
          this.router.navigate(['/usuario/forbidden']); // ou alguma página de acesso negado
          return false;
        }
      }

      // Se a rota não define restrição, permite o acesso
      return true;
    }

    // Se não estiver logado
    this.router.navigate(['/login']);
    return false;
  }
}
