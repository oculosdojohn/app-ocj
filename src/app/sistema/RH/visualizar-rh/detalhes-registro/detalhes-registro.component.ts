import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Colaborador } from 'src/app/sistema/Administrativo/funcionarios/colaborador';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';
import { CargoDescricoes } from 'src/app/sistema/Administrativo/funcionarios/enums/cargo-descricoes';
import { RegistrosService } from 'src/app/services/rh/registros.service';
import { Registro } from '../../registros/registro';
import { TipoRegistro } from '../../registros/enums/tipoRegistro';
import { tipoRegistroDescricao } from '../../registros/enums/tipoRegistro-descricao';

@Component({
  selector: 'app-detalhes-registro',
  templateUrl: './detalhes-registro.component.html',
  styleUrls: ['./detalhes-registro.component.css'],
})
export class DetalhesRegistroComponent implements OnInit {
  registro!: Registro;

  selectedDepartamento: any;
  selectedCargo: any;

  constructor(
    private location: Location,
    private colaboradorService: ColaboradorService,
    private route: ActivatedRoute,
    private registrosService: RegistrosService
  ) {}

  ngOnInit(): void {
    this.carregarRegistro();
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

  carregarRegistro(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.registrosService.buscarRegistroPorId(id).subscribe(
        (response) => {
          this.registro = response;
          console.log('Dados de registro carregados:', this.registro);
        },
        (error) => {
          console.error('Erro ao carregar os dados do registro:', error);
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

  getDescricaoTipoRegistro(tipoRegistro: string): string {
    return (
      tipoRegistroDescricao[
        tipoRegistro as keyof typeof tipoRegistroDescricao
      ] ||
      tipoRegistro ||
      '-'
    );
  }
}
