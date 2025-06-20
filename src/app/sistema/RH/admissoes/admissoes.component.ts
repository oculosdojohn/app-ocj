import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admissao } from './admissoes';
import { CargoDescricoes } from '../../Administrativo/funcionarios/enums/cargo-descricoes';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Permissao } from 'src/app/login/permissao';

@Component({
  selector: 'app-admissoes',
  templateUrl: './admissoes.component.html',
  styleUrls: ['./admissoes.component.css'],
})
export class AdmissoesComponent implements OnInit {
  termoBusca: string = '';
  mensagemBusca: string = '';
  isLoading = false;
  successMessage: string = '';
  messageTimeout: any;

  admissoes: Admissao[] = [];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.admissoes.length / this.itensPorPagina);
  admissoesPaginados: Admissao[] = [];

  public Permissao = Permissao;
  public cargoUsuario!: Permissao;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.admissoes = [
      {
        colaborador: 'Maria Silva',
        loja: 'Óculos do John - Russas',
        departamento: 'Financeiro',
        cargo: 'Vendedor',
        status: 'Inativo',
      },
      {
        colaborador: 'João Souza',
        loja: 'Óculos do John - Russas',
        departamento: 'Comercial',
        cargo: 'Vendedor',
        status: 'Inativo',
      },
    ];
    this.atualizarPaginacao();
    // já busca o perfil e define o cargo
    this.authService.obterPerfilUsuario().subscribe((usuario) => {
      this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
    });
  }

  onSearch(searchTerm: string) {
    console.log('Search term:', searchTerm);
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.admissoesPaginados = this.admissoes.slice(inicio, fim);
  }

  get totalItens() {
    return this.admissoes.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  getDescricaoCargo(cargo: string): string {
    return (
      CargoDescricoes[cargo as keyof typeof CargoDescricoes] ||
      'Cargo desconhecido'
    );
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

  get rotaDashboard(): string {
    if (this.cargoUsuario === Permissao.ADMIN) return '/dashboard-admin';
    if (this.cargoUsuario === Permissao.RH) return '/dashboard-rh';
    if (this.cargoUsuario === Permissao.GERENTE) return '/dashboard-gerente';
    if (
      this.cargoUsuario === Permissao.CONSULTOR_VENDAS ||
      this.cargoUsuario === Permissao.VENDEDOR ||
      this.cargoUsuario === Permissao.FINANCEIRO ||
      this.cargoUsuario === Permissao.COBRADOR ||
      this.cargoUsuario === Permissao.ESTAGIARIO
    )
      return '/dashboard-colaborador';
    return '/login';
  }
}
