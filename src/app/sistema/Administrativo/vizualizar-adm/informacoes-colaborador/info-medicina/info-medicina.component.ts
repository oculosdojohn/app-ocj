import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Medicina } from 'src/app/sistema/RH/medicina/medicina';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Permissao } from 'src/app/login/permissao';
import { MedicinaService } from 'src/app/services/rh/medicina.service';
import { ModalDeleteService } from 'src/app/services/modal/modal-delete.service';
import { TiposProcedimentoDescricoes } from 'src/app/sistema/RH/medicina/enums/tipoProcedimentoDescricao';
import { CID10Descricoes } from 'src/app/sistema/RH/medicina/enums/cid10-descricao';

@Component({
  selector: 'app-info-medicina',
  templateUrl: './info-medicina.component.html',
  styleUrls: ['./info-medicina.component.css'],
})
export class InfoMedicinaComponent implements OnInit {
  @Input() colaboradorId!: number;
  isLoading = false;

  medicinas: Medicina[] = [];
  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.medicinas.length / this.itensPorPagina);
  medicinasPaginados: Medicina[] = [];
  selectedMedicina: any = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private medicinaService: MedicinaService,
    private modalDeleteService: ModalDeleteService
  ) {}

  ngOnInit(): void {
    if (this.colaboradorId) {
      this.fetchMedicina();
    }
    this.atualizarPaginacao();
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.medicinasPaginados = this.medicinas.slice(inicio, fim);
  }

  get totalItens() {
    return this.medicinas.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  fetchMedicina(): void {
    this.isLoading = true;

    this.medicinaService
      .listarProcedimentosPorColaborador(this.colaboradorId)
      .subscribe(
        (medicinas: Medicina[]) => {
          console.log('Procedimentos médicos retornados:', medicinas);
          this.medicinas = medicinas;
          this.totalPaginas = Math.ceil(
            this.medicinas.length / this.itensPorPagina
          );
          this.atualizarPaginacao();
          this.isLoading = false;
        },
        (error) => {
          console.error('Erro ao carregar procedimentos médicos:', error);
          this.isLoading = false;
        }
      );
  }

  visualizarMedicina(id: string): void {
    this.router.navigate(['/usuario/detalhes-saude-ocupacional', id]);
  }

  editarMedicina(id: string): void {
    this.router.navigate(['/usuario/cadastro-de-procedimentos-medicos', id]);
  }

  deleteMedicina(id: string): void {
    const medicinaRemovida = this.medicinas.find((e) => e.id === id);
    this.medicinaService.excluirProcedimentoMedico(id).subscribe(
      () => {
        console.log('Medicina deletada com sucesso!');
        this.fetchMedicina();
      },
      (error) => {
        console.error('Erro ao deletar a medicina:', error);
      }
    );
  }

  openModalDeletar(medicina: any): void {
    this.selectedMedicina = medicina;

    this.modalDeleteService.openModal(
      {
        title: 'Remoção de Procedimento Médico',
        description: `Tem certeza que deseja excluir o procedimento médico <strong>${this.getDescricaoTipoProcedimento(
          medicina.tipo
        )}</strong> do colaborador(a) ${
          medicina.colaborador?.username || '-'
        }?`,
        item: medicina,
        deletarTextoBotao: 'Remover',
        size: 'md',
      },
      () => {
        this.deleteMedicina(medicina.id);
      }
    );
  }

  getDescricaoTipoProcedimento(tipo: string): string {
    return (
      TiposProcedimentoDescricoes[
        tipo as keyof typeof TiposProcedimentoDescricoes
      ] ||
      tipo ||
      '-'
    );
  }

  getDescricaoCID10(cid10: string): string {
    return (
      CID10Descricoes[cid10 as keyof typeof CID10Descricoes] || cid10 || '-'
    );
  }
}
