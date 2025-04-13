import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DepartamentoService } from '../../../../services/administrativo/departamento.service';
import { Departamento } from '../../../../sistema/Administrativo/departamentos/departamento';

@Component({
  selector: 'app-detalhes-departamento',
  templateUrl: './detalhes-departamento.component.html',
  styleUrls: ['./detalhes-departamento.component.css'],
})
export class DetalhesDepartamentoComponent implements OnInit {
  departamento!: Departamento;

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

  carregarDepartamento(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.departamentoService.getDepartamentoById(id).subscribe(
        (response) => {
          this.departamento = response;
          console.log('Dados de departamento carregados:', this.departamento);
        },
        (error) => {
          console.error('Erro ao carregar os dados do departamento:', error);
        }
      );
    }
  }
}
