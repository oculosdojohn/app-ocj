import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meses } from '../ferias/Meses';
import { MesesDescricoes } from '../ferias/MesesDescricoes';
import { Aniversario } from './aniversario';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Permissao } from 'src/app/login/permissao';

@Component({
  selector: 'app-aniversariantes',
  templateUrl: './aniversariantes.component.html',
  styleUrls: ['./aniversariantes.component.css'],
})
export class AniversariantesComponent implements OnInit {
  selectedMes: string = '';
  mensagemBusca: string = '';
  isLoading = false;
  successMessage: string = '';
  messageTimeout: any;

  aniversarios: Aniversario[] = [];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.aniversarios.length / this.itensPorPagina);
  aniversariosPaginados: Aniversario[] = [];
  aniversariosFiltrados: Aniversario[] = [];

  meses = Object.keys(Meses).map((key) => ({
    value: Meses[key as keyof typeof Meses],
    description: MesesDescricoes[Meses[key as keyof typeof Meses]],
  }));

  public Permissao = Permissao;
  public cargoUsuario!: Permissao;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.filtrarPorMes();
    // já busca o perfil e define o cargo
    this.authService.obterPerfilUsuario().subscribe((usuario) => {
      this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
    });
  }

  filtrarPorMes(): void {
    console.log('Mês selecionado:', this.selectedMes);
    if (this.selectedMes) {
      this.aniversariosFiltrados = this.aniversarios.filter((aniversario) => {
        const mes = aniversario.data.split('/')[1];
        return mes === this.selectedMes;
      });
    } else {
      this.aniversariosFiltrados = [...this.aniversarios];
    }
    console.log('Aniversários filtrados:', this.aniversariosFiltrados);
    this.atualizarPaginacao();
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.aniversariosPaginados = this.aniversariosFiltrados.slice(inicio, fim);
    console.log('Aniversários paginados:', this.aniversariosPaginados);
  }

  get totalItens() {
    return this.aniversariosFiltrados.length;
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
