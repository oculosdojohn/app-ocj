import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Modulos } from '../cursos/enums/modulos';
import { ModulosDescricao } from '../cursos/enums/modulos-descricao';

@Component({
  selector: 'app-modulo-curso',
  templateUrl: './modulo-curso.component.html',
  styleUrls: ['./modulo-curso.component.css']
})
export class ModuloCursoComponent implements OnInit {
  modulo: Modulos | undefined;
  descricao: string = '';

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('modulo') || '';
      const moduloObj = Object.keys(Modulos).find(key => this.generateSlug(ModulosDescricao[Modulos[key as keyof typeof Modulos]]) === slug);
      if (moduloObj) {
        this.modulo = Modulos[moduloObj as keyof typeof Modulos];
        this.descricao = ModulosDescricao[this.modulo];
      }
    });
  }

  generateSlug(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
}
