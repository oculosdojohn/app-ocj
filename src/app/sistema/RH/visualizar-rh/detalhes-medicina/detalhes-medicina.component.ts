import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Colaborador } from 'src/app/sistema/Administrativo/funcionarios/colaborador';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';
import { CargoDescricoes } from 'src/app/sistema/Administrativo/funcionarios/enums/cargo-descricoes';
import { MedicinaService } from 'src/app/services/rh/medicina.service';
import { Medicina } from '../../medicina/medicina';
import { TiposProcedimentoDescricoes } from '../../medicina/enums/tipoProcedimentoDescricao';
import { CID10Descricoes } from '../../medicina/enums/cid10-descricao';

@Component({
  selector: 'app-detalhes-medicina',
  templateUrl: './detalhes-medicina.component.html',
  styleUrls: ['./detalhes-medicina.component.css'],
})
export class DetalhesMedicinaComponent implements OnInit {
  medicina!: Medicina;

  selectedDepartamento: any;
  selectedCargo: any;

  constructor(
    private location: Location,
    private colaboradorService: ColaboradorService,
    private route: ActivatedRoute,
    private medicinaService: MedicinaService
  ) {}

  ngOnInit(): void {
    this.carregarMedicina();
  }

  goBack() {
    this.location.back();
  }

  getDescricaoCargo(cargo: string): string {
    return (
      CargoDescricoes[cargo as keyof typeof CargoDescricoes] ||
      'Cargo desconhecido'
    );
  }

  carregarMedicina(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.medicinaService.buscarProcedimentoMedicoPorId(id).subscribe(
        (response) => {
          this.medicina = response;
          console.log('Dados de medicina carregados:', this.medicina);
        },
        (error) => {
          console.error('Erro ao carregar os dados da medicina:', error);
        }
      );
    }
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

  viewPdf(url: string): void {
    window.open(url, '_blank');
  }

  formatFileName(fileName: string): string {
    return fileName.replace(/^\d+_/, '').replace(/_/g, ' ');
  }
}
