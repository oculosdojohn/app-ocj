import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Colaborador } from '../../funcionarios/colaborador';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';
import { Departamento } from '../../../../sistema/Administrativo/departamentos/departamento';
import { CargoDescricoes } from '../../../../sistema/Administrativo/funcionarios/enums/cargo-descricoes';

@Component({
  selector: 'app-detalhes-colaborador',
  templateUrl: './detalhes-colaborador.component.html',
  styleUrls: ['./detalhes-colaborador.component.css'],
})
export class DetalhesColaboradorComponent implements OnInit {
  colaborador!: Colaborador;
  selectedSectorId = 'geral';

  setores = [
    { name: 'Dados do colaborador', id: 'geral' },
    { name: 'Medicina', id: 'medicina' },
    { name: 'Registros', id: 'registro' },
    { name: 'Feedback', id: 'feedback' },
    { name: 'Observações', id: 'observacao' },
  ];

  selectedDepartamento: any;
  selectedCargo: any;

  constructor(
    private location: Location,
    private colaboradorService: ColaboradorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.carregarUsuario();
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

  carregarUsuario(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.colaboradorService.getColaboradorById(id).subscribe(
        (response) => {
          this.colaborador = response;
          console.log('Dados de usuario carregados:', this.colaborador);
        },
        (error) => {
          console.error('Erro ao carregar os dados do usuario:', error);
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

  onSectorChange(id: string) {
    this.selectedSectorId = id;
  }

  viewPdf(url: string): void {
    window.open(url, '_blank');
  }

  formatFileName(fileName: string): string {
    return fileName.replace(/^\d+_/, '').replace(/_/g, ' ');
  }
}
