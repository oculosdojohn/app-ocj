import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/configs/auth.service';
import { CargoDescricoes } from 'src/app/sistema/Administrativo/funcionarios/enums/cargo-descricoes';
import { Permissao } from 'src/app/login/permissao';
import { PermissaoDescricoes } from 'src/app/login/permissao-descricao';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';
import { ModalPadraoService } from 'src/app/services/modal/modal-padrao.service';

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
  qtdMoedas: number = 0;
  valorAnimadoMoedas: number = 0;
  private animacaoTimeout: any;

  isGeralMenuOpen = false;
  isRHMenuOpen = false;
  isDropdownOpen = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService,
    private colaboradorService: ColaboradorService,
    private modalConfirmacaoService: ModalPadraoService
  ) {}

  ngOnInit() {
    this.authService.obterPerfilUsuario().subscribe(
      (usuario) => {
        this.nomeUsuario = usuario.username;
        this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
        this.permissaoUsuario = PermissaoDescricoes[this.cargoUsuario];
        this.fotoUsuario = usuario.foto?.documentoUrl || '';
        this.qtdMoedas = usuario.qtdMoedas || 0;
        this.valorAnimadoMoedas = this.qtdMoedas;
        this.colaboradorService.atualizarMoedas(this.qtdMoedas);
        // console.log('Permissão atribuída (cargoUsuario):', this.cargoUsuario);
      },
      (error) => {
        // console.error('Erro ao obter perfil do usuário:', error);
      }
    );

    this.colaboradorService.moedas$.subscribe((valor) => {
      this.animarMoedas(this.valorAnimadoMoedas, valor);
      this.qtdMoedas = valor;
    });
  }

  isAdmin(): boolean {
    return (
      this.cargoUsuario === 'ROLE_ADMIN' || this.cargoUsuario === 'ROLE_DIRETOR' || this.cargoUsuario === 'ROLE_SUPORTE_TI'
    );
  }

  isColaborador(): boolean {
    return (
      this.cargoUsuario === Permissao.CONSULTOR_VENDAS ||
      this.cargoUsuario === Permissao.VENDEDOR ||
      this.cargoUsuario === Permissao.FINANCEIRO ||
      this.cargoUsuario === Permissao.COBRADOR ||
      this.cargoUsuario === Permissao.ESTAGIARIO ||
      this.cargoUsuario === Permissao.ASSISTENTE_ADMINISTRATIVO ||
      this.cargoUsuario === Permissao.AUXILIAR_ESCRITORIO ||
      this.cargoUsuario === Permissao.MARKETING ||
      this.cargoUsuario === Permissao.MONTADOR ||
      this.cargoUsuario === Permissao.MOTORISTA
    );
  }

  isGerente(): boolean {
    return ['ROLE_GERENTE', 'ROLE_SUPERVISOR', 'ROLE_GERENTE_GERAL'].includes(
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

  getPrimeirosNomes(nome: string): string {
    if (!nome) return '';
    const partes = nome.trim().split(' ');
    return partes.slice(0, 2).join(' ');
  }

  // Função de animação
  animarMoedas(valorAtual: number, valorFinal: number) {
    if (this.animacaoTimeout) {
      clearTimeout(this.animacaoTimeout);
    }
    const duracao = 1000;
    const passos = 40;
    const incremento = (valorFinal - valorAtual) / passos;
    let passoAtual = 0;
    const easeOutQuad = (t: number) => t * (2 - t);

    const isAumentando = valorFinal > valorAtual;

    const spanElement = document.querySelector('.qtd-moedas span');
    if (spanElement) {
      spanElement.classList.remove('aumentando', 'diminuindo');
      if (isAumentando) {
        spanElement.classList.add('aumentando');
      } else {
        spanElement.classList.add('diminuindo');
      }
    }

    const animar = () => {
      passoAtual++;
      const progresso = passoAtual / passos;
      const valorInterpolado =
        valorAtual + (valorFinal - valorAtual) * easeOutQuad(progresso);
      this.valorAnimadoMoedas = Math.round(valorInterpolado);

      if (passoAtual < passos) {
        this.animacaoTimeout = setTimeout(animar, duracao / passos);
      } else {
        this.valorAnimadoMoedas = valorFinal;
        if (spanElement) {
          setTimeout(() => {
            spanElement.classList.remove('aumentando', 'diminuindo');
          }, 300);
        }
      }
    };
    animar();
  }

  openModalLogout(): void {
    this.modalConfirmacaoService.openModal(
      {
        title: 'Sair da Plataforma',
        description: `Tem certeza que deseja sair da plataforma <strong>OCJ</strong>? Você será redirecionado para a tela de login.`,
        confirmTextoBotao: 'Sair',
        size: 'md',
      },
      () => {
        this.logout();
      }
    );
  }
}
