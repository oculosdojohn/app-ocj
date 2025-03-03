import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos = [
    "História de sucesso- Grupo OCJ",
    "Onboarding",
    "Princípios básicos de Ótica",
    "Script de vendas",
    "Como conseguir clientes",
    "Consultor Ótico de alta performance",
    "Limpeza e manutenção dos produtos",
    "Manutenção de óculos",
    "Garantia de produtos",
    "Embalagem padrão dos produtos",
    "Entrega de óculos de grau",
    "Padrões de atendimento",
    "SSotica sistema de vendas",
    "SSotica (caixa)",
    "EU SOU VENDEDOR",
    "Inteligência emocional"
  ];
  

  cursosPorPagina = 6;
  paginaAtual = 1;

  constructor(private router: Router) { } 

  ngOnInit(): void {
  }

  cadastrarAula(): void {
    this.router.navigate(['/usuario/cadastro-de-aulas']); 
  }

  get cursosPaginados() {
    const inicio = (this.paginaAtual - 1) * this.cursosPorPagina;
    return this.cursos.slice(inicio, inicio + this.cursosPorPagina);
  }
  
  mudarPagina(numeroPagina: number) {
    this.paginaAtual = numeroPagina;
  }

}
