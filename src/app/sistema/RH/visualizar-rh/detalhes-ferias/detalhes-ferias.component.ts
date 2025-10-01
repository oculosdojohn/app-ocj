import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Colaborador } from 'src/app/sistema/Administrativo/funcionarios/colaborador';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';
import { CargoDescricoes } from 'src/app/sistema/Administrativo/funcionarios/enums/cargo-descricoes';
import { FeriasService } from 'src/app/services/rh/ferias.service';
import { Ferias } from '../../ferias/ferias';
import { Meses } from '../../ferias/Meses';
import { MesesDescricoes } from '../../ferias/MesesDescricoes';

@Component({
  selector: 'app-detalhes-ferias',
  templateUrl: './detalhes-ferias.component.html',
  styleUrls: ['./detalhes-ferias.component.css'],
})
export class DetalhesFeriasComponent implements OnInit {
  ferias!: Ferias;

  selectedDepartamento: any;
  selectedCargo: any;

  constructor(
    private location: Location,
    private colaboradorService: ColaboradorService,
    private route: ActivatedRoute,
    private feriasService: FeriasService
  ) {}

  ngOnInit(): void {
    this.carregarFerias();
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

  carregarFerias(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.feriasService.buscarFeriasPorId(id).subscribe(
        (response) => {
          this.ferias = response;
          console.log('Dados de férias carregados:', this.ferias);
        },
        (error) => {
          console.error('Erro ao carregar os dados das férias:', error);
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
