import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DepartamentoService } from '../../../../services/administrativo/departamento.service';
import { Departamento } from '../../../../sistema/Administrativo/departamentos/departamento';
import { CargoDescricoes } from '../../../../sistema/Administrativo/funcionarios/enums/cargo-descricoes';

@Component({
  selector: 'app-detalhes-departamento',
  templateUrl: './detalhes-departamento.component.html',
  styleUrls: ['./detalhes-departamento.component.css'],
})
export class DetalhesDepartamentoComponent implements OnInit {
  departamento!: Departamento;
  colaboradores: any[] = [];
  responsaveis: any[] = [];

  constructor(
    private location: Location,
    private departamentoService: DepartamentoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.carregarDepartamento();
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

  carregarDepartamento(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.departamentoService.getDepartamentoById(id).subscribe(
        (response) => {
          this.departamento = response;
          this.colaboradores = response.colaboradores || [];
          this.responsaveis = response.responsaveis || [];
          console.log('Dados de departamento carregados:', this.departamento);
        },
        (error) => {
          console.error('Erro ao carregar os dados do departamento:', error);
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
}
