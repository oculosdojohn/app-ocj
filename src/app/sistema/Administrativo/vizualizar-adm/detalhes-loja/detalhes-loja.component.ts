import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LojaService } from '../../../../services/administrativo/loja.service';
import { Loja } from '../../../../sistema/Administrativo/lojas/loja';


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
}
