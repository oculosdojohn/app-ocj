import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;
 
  permissaoUsuario: string = 'Administrador'; // Pegue dinamicamente do serviço de autenticação
  nomeUsuario: string = 'Johnatta'; 

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) { }

  ngOnInit() {

  }

  logout() {
    this.router.navigate(['/login']);
  }

  toggleDropdown(): void {
    // Função opcional, caso queira adicionar mais lógica ao dropdown
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  isSidenavOpen() {
    return this.breakpointObserver.isMatched('(min-width: 901px)');
  }

  getSidenavMode() {
    return this.breakpointObserver.isMatched('(min-width: 901px)') ? 'side' : 'over';
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  verPerfil(): void {
    // Redirecione para a página de perfil
    console.log('Abrindo página de perfil...');
  }



}
