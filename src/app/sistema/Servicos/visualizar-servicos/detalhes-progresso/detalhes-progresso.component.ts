import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Colaborador } from 'src/app/sistema/Administrativo/funcionarios/colaborador';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';
import { CargoDescricoes } from 'src/app/sistema/Administrativo/funcionarios/enums/cargo-descricoes';

@Component({
  selector: 'app-detalhes-progresso',
  templateUrl: './detalhes-progresso.component.html',
  styleUrls: ['./detalhes-progresso.component.css'],
})
export class DetalhesProgressoComponent implements OnInit {
  colaborador!: Colaborador;
  selectedSectorId = 'curso';

  setores = [{ name: 'Progresso no curso', id: 'curso' }];

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
}
