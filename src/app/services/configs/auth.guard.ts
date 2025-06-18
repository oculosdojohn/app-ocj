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
    if (this.authService.isAuthenticated()) {
      
      const usuario = this.authService.getUsuarioAutenticado();
      const role = usuario?.permissao;
      const permissoesRota = route.data['roles'] as string[] | undefined;
  
      if (permissoesRota && role) {
        if (permissoesRota.includes(role)) return true;
        const dashboard = this.getDashboardByRole(role);
        this.router.navigate([dashboard]);
        return false;
      }
  
      return true;
    }

    this.authService.encerrarSessao();
    localStorage.clear(); 
    this.router.navigate(['/login']);
    return false;
  }
  

  private getDashboardByRole(role: string): string {
    switch (role) {
      case 'ROLE_ADMIN':
        return '/usuario/dashboard-admin';
      case 'ROLE_RH':
        return '/usuario/dashboard-rh';
      case 'ROLE_VENDEDOR':
      case 'ROLE_CONSULTOR_VENDAS':
      case 'ROLE_FINANCEIRO':
      case 'ROLE_COBRADOR':
      case 'ROLE_ESTAGIARIO':
        return '/usuario/dashboard-colaborador';
      case 'ROLE_GERENTE':
      case 'GERENTE_GERAL':
      case 'SUPERVISOR':
        return '/usuario/dashboard-gerente';
      default:
        return '/usuario/dashboard-colaborador'; // fallback para roles não reconhecidas
    }
  }
}
