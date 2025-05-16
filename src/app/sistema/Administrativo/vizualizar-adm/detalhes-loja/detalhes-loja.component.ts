import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LojaService } from '../../../../services/administrativo/loja.service';
import { Loja } from '../../../../sistema/Administrativo/lojas/loja';
import { CargoDescricoes } from '../../funcionarios/enums/cargo-descricoes';

@Component({
  selector: 'app-detalhes-loja',
  templateUrl: './detalhes-loja.component.html',
  styleUrls: ['./detalhes-loja.component.css'],
})
export class DetalhesLojaComponent implements OnInit {
  loja!: Loja;

  constructor(
    private location: Location,
    private lojaService: LojaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.carregarLoja();
  }

  goBack() {
    this.location.back();
  }

  carregarLoja(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.lojaService.getLojaById(id).subscribe(
        (response) => {
          this.loja = response;
          console.log('Dados da loja carregados:', this.loja);
        },
        (error) => {
          console.error('Erro ao carregar os dados da loja:', error);
        }
      );
    }
  }

  getDescricaoCargo(cargo: string): string {
    return (
      CargoDescricoes[cargo as keyof typeof CargoDescricoes] ||
      'Cargo desconhecido'
    );
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
