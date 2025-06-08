import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ferias } from './ferias';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Permissao } from 'src/app/login/permissao';

@Component({
  selector: 'app-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.css'],
})
export class FeriasComponent implements OnInit {
  ferias: Ferias[] = [];
  mensagemBusca: string = '';
  isLoading = false;
  successMessage: string = '';
  messageTimeout: any;

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.ferias.length / this.itensPorPagina);
  feriasPaginadas: Ferias[] = [];

  public Permissao = Permissao;
  public cargoUsuario!: Permissao;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.atualizarPaginacao();
    // já busca o perfil e define o cargo
    this.authService.obterPerfilUsuario().subscribe((usuario) => {
      this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
    });
  }

  cadastrarFerias(): void {
    this.router.navigate(['/usuario/cadastro-de-ferias']);
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.feriasPaginadas = this.ferias.slice(inicio, fim);
  }

  get totalItens() {
    return this.ferias.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  get rotaDashboard(): string {
    if (this.cargoUsuario === Permissao.ADMIN) return '/dashboard-admin';
    if (this.cargoUsuario === Permissao.RH) return '/dashboard-rh';
    if (this.cargoUsuario === Permissao.GERENTE) return '/dashboard-gerente';
    if (
      this.cargoUsuario === Permissao.COLABORADOR ||
      this.cargoUsuario === Permissao.VENDEDOR
    )
      return '/dashboard-colaborador';
    return '/login';
  }
}
