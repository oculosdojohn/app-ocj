import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/configs/auth.service';
import { CargoDescricoes } from 'src/app/sistema/Administrativo/funcionarios/enums/cargo-descricoes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  permissaoUsuario: string = '';
  nomeUsuario: string = '';

  isGeralMenuOpen = false;
  isRHMenuOpen = false;
  isDropdownOpen = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.obterPerfilUsuario().subscribe(
      (usuario) => {
        this.nomeUsuario = usuario.username;
        this.permissaoUsuario = CargoDescricoes[usuario.cargo as keyof typeof CargoDescricoes] || usuario.cargo;
      },
      (error) => {
        console.error('Erro ao obter perfil do usuário:', error);
      }
    );
  }

  logout() {
    this.router.navigate(['/login']);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    const dropdownToggle = document.getElementById('dropdown-button');
    if (dropdownToggle) {
      if (this.isDropdownOpen) {
        dropdownToggle.classList.add('active');
      } else {
        dropdownToggle.classList.remove('active');
      }
    }
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  isSidenavOpen() {
    return this.breakpointObserver.isMatched('(min-width: 901px)');
  }

  getSidenavMode() {
    return this.breakpointObserver.isMatched('(min-width: 901px)')
      ? 'side'
      : 'over';
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  verPerfil(): void {
    this.router.navigate(['/usuario/meu-perfil']);
  }

  toggleGeralMenu() {
    this.isGeralMenuOpen = !this.isGeralMenuOpen;
  }

  toggleRHMenu() {
    this.isRHMenuOpen = !this.isRHMenuOpen;
  }
}
