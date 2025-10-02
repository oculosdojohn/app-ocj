import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Permissao } from 'src/app/login/permissao';
import { Registro } from 'src/app/sistema/RH/registros/registro';
import { RegistrosService } from 'src/app/services/rh/registros.service';
import { ModalDeleteService } from 'src/app/services/modal/modal-delete.service';

@Component({
  selector: 'app-info-registro',
  templateUrl: './info-registro.component.html',
  styleUrls: ['./info-registro.component.css'],
})
export class InfoRegistroComponent implements OnInit {
  @Input() colaboradorId!: number;
  isLoading = false;

  registros: Registro[] = [];
  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.registros.length / this.itensPorPagina);
  registrosPaginados: Registro[] = [];
  selectedRegistro: any = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private registrosService: RegistrosService,
    private modalDeleteService: ModalDeleteService
  ) {}

  ngOnInit(): void {
    if (this.colaboradorId) {
      this.fetchRegistros();
    }
    this.atualizarPaginacao();
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.registrosPaginados = this.registros.slice(inicio, fim);
  }

  get totalItens() {
    return this.registros.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  fetchRegistros(): void {
    this.isLoading = true;

    this.registrosService
      .listarRegistrosPorUsuarioId(this.colaboradorId.toString())
      .subscribe(
        (registros: Registro[]) => {
          console.log('Registros retornados:', registros);
          this.registros = registros;
          this.totalPaginas = Math.ceil(
            this.registros.length / this.itensPorPagina
          );
          this.atualizarPaginacao();
          this.isLoading = false;
        },
        (error) => {
          console.error('Erro ao carregar feedbacks:', error);
          this.isLoading = false;
        }
      );
  }

  visualizarRegistro(id: string): void {
    this.router.navigate(['/usuario/detalhes-registro', id]);
  }

  editarRegistro(id: string): void {
    this.router.navigate(['/usuario/cadastro-de-registro', id]);
  }

  deleteRegistro(id: string): void {
    const registroRemovido = this.registros.find((e) => e.id === id);
    this.registrosService.deletarRegistro(id).subscribe(
      () => {
        console.log('Registro deletado com sucesso!');
        this.fetchRegistros();
      },
      (error) => {
        console.error('Erro ao deletar o registro:', error);
      }
    );
  }

  openModalDeletar(registro: any): void {
    this.selectedRegistro = registro;

    this.modalDeleteService.openModal(
      {
        title: 'Remoção de Registro',
        description: `Tem certeza que deseja excluir o registro <strong>${
          registro.classificacao || '-'
        }</strong> do colaborador(a) ${registro.colaborador?.username || '-'}?`,
        item: registro,
        deletarTextoBotao: 'Remover',
        size: 'md',
      },
      () => {
        this.deleteRegistro(registro.id);
      }
    );
  }
}
