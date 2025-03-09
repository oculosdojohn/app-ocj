import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modulos } from '../cursos/enums/modulos';
import { ModulosDescricao } from '../cursos/enums/modulos-descricao';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  modulos = Object.keys(Modulos).map(key => ({
    value: Modulos[key as keyof typeof Modulos],
    description: ModulosDescricao[Modulos[key as keyof typeof Modulos]],
    slug: this.generateSlug(ModulosDescricao[Modulos[key as keyof typeof Modulos]])
  }));

  cursosPorPagina = 6;
  paginaAtual = 1;

  constructor(private router: Router) { } 

  ngOnInit(): void {
  }

  cadastrarAula(): void {
    this.router.navigate(['/usuario/cadastro-de-aulas']); 
  }

  get modulosPaginados() {
    const inicio = (this.paginaAtual - 1) * this.cursosPorPagina;
    return this.modulos.slice(inicio, inicio + this.cursosPorPagina);
  }
  
  mudarPagina(numeroPagina: number) {
    this.paginaAtual = numeroPagina;
  }

  navegarParaModulo(modulo: string): void {
    const moduloSlug = this.modulos.find(m => m.value === modulo)?.slug;
    if (moduloSlug) {
      this.router.navigate(['/usuario/curso', moduloSlug]);
    }
  }

  generateSlug(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
}
