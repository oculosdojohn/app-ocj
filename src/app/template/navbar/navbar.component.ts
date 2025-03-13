import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  permissaoUsuario: string = 'Administrador';
  nomeUsuario: string = 'Johnatta';

  isGeralMenuOpen = false;
  isRHMenuOpen = false;
  isDropdownOpen = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit() {}

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
    console.log('Abrindo página de perfil...');
  }

  toggleGeralMenu() {
    this.isGeralMenuOpen = !this.isGeralMenuOpen;
  }

  toggleRHMenu() {
    this.isRHMenuOpen = !this.isRHMenuOpen;
  }
}
