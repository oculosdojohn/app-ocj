import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Permissao } from 'src/app/login/permissao';
import { Ferias } from 'src/app/sistema/RH/ferias/ferias';
import { FeriasService } from 'src/app/services/rh/ferias.service';
import { ModalDeleteService } from 'src/app/services/modal/modal-delete.service';
import { Meses } from 'src/app/sistema/RH/ferias/Meses';
import { MesesDescricoes } from 'src/app/sistema/RH/ferias/MesesDescricoes';

@Component({
  selector: 'app-info-ferias',
  templateUrl: './info-ferias.component.html',
  styleUrls: ['./info-ferias.component.css'],
})
export class InfoFeriasComponent implements OnInit {
  @Input() colaboradorId!: number;
  isLoading = false;

  ferias: Ferias[] = [];
  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.ferias.length / this.itensPorPagina);
  feriasPaginadas: Ferias[] = [];
  selectedFerias: any = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private feriasService: FeriasService,
    private modalDeleteService: ModalDeleteService
  ) {}

  ngOnInit(): void {
    if (this.colaboradorId) {
      this.fetchFerias();
    }
    this.atualizarPaginacao();
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

  fetchFerias(): void {
    this.isLoading = true;

    this.feriasService
      .listarFeriasPorColaborador(this.colaboradorId.toString())
      .subscribe(
        (ferias: Ferias[]) => {
          console.log('Férias retornadas:', ferias);
          this.ferias = ferias;
          this.totalPaginas = Math.ceil(
            this.ferias.length / this.itensPorPagina
          );
          this.atualizarPaginacao();
          this.isLoading = false;
        },
        (error) => {
          console.error('Erro ao carregar férias:', error);
          this.isLoading = false;
        }
      );
  }

  visualizarFerias(id: string): void {
    this.router.navigate(['/usuario/detalhes-ferias', id]);
  }

  editarFerias(id: string): void {
    this.router.navigate(['/usuario/cadastro-de-ferias', id]);
  }

  deleteFerias(id: string): void {
    const feriasRemovido = this.ferias.find((e) => e.id === id);
    this.feriasService.deletarFerias(id).subscribe(
      () => {
        console.log('Férias deletadas com sucesso!');
        this.fetchFerias();
      },
      (error) => {
        console.error('Erro ao deletar as férias:', error);
      }
    );
  }

  openModalDeletar(ferias: any): void {
    this.selectedFerias = ferias;

    this.modalDeleteService.openModal(
      {
        title: 'Remoção de Férias',
        description: `Tem certeza que deseja excluir as férias <strong>${
          ferias.classificacao || '-'
        }</strong> do colaborador(a) ${ferias.colaborador?.username || '-'}?`,
        item: ferias,
        deletarTextoBotao: 'Remover',
        size: 'md',
      },
      () => {
        this.deleteFerias(ferias.id);
      }
    );
  }

  getDescricaoMes(mes: string | number): string {
    if (!mes) return '-';
    const mesFormatado = mes.toString().padStart(2, '0');

    return (
      MesesDescricoes[mesFormatado as keyof typeof MesesDescricoes] ||
      mes.toString() ||
      '-'
    );
  }
}
