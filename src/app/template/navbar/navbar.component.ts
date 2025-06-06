import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/configs/auth.service';
import { CargoDescricoes } from 'src/app/sistema/Administrativo/funcionarios/enums/cargo-descricoes';
import { Permissao } from 'src/app/login/permissao';
import { PermissaoDescricoes } from 'src/app/login/permissao-descricao';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  permissaoUsuario: string = '';

  public Permissao = Permissao; // Expor para o HTML
  cargoUsuario!: Permissao; // Receberá 'ROLE_ADMIN', etc.

  nomeUsuario: string = '';
  fotoUsuario: string = '';

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
        this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
        this.permissaoUsuario = PermissaoDescricoes[this.cargoUsuario];
        this.fotoUsuario = usuario.foto?.documentoUrl || '';
        console.log('Permissão atribuída (cargoUsuario):', this.cargoUsuario);
      },
      (error) => {
        console.error('Erro ao obter perfil do usuário:', error);
      }
    );
  }

  isAdmin(): boolean {
    return this.cargoUsuario === 'ROLE_ADMIN';
  }

  isColaborador(): boolean {
    return (
      this.cargoUsuario === 'ROLE_COLABORADOR' ||
      this.cargoUsuario === 'ROLE_VENDEDOR'
    );
  }

  isGerente(): boolean {
    return ['ROLE_GERENTE', 'SUPERVISOR', 'GERENTE_GERAL'].includes(
      this.cargoUsuario
    );
  }

  isRH(): boolean {
    return this.cargoUsuario === 'ROLE_RH';
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

  verMeusProdutos(): void {
    this.router.navigate(['/usuario/meus-produtos']);
  }

  toggleGeralMenu() {
    this.isGeralMenuOpen = !this.isGeralMenuOpen;
  }

  toggleRHMenu() {
    this.isRHMenuOpen = !this.isRHMenuOpen;
  }

  getInitial(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '?';
  }

  getRandomColor(seed: string): string {
    const colors = [
      '#FFB3BA', // Rosa pastel
      '#FFDFBA', // Laranja pastel
      '#BAFFC9', // Verde pastel
      '#BAE1FF', // Azul pastel
      '#D5BAFF', // Roxo pastel
    ];
    const index = seed ? seed.charCodeAt(0) % colors.length : 0;
    return colors[index];
  }
}
