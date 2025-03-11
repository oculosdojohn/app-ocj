import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Noticia } from './noticia';

@Component({
  selector: 'app-forum-noticias',
  templateUrl: './forum-noticias.component.html',
  styleUrls: ['./forum-noticias.component.css'],
})
export class ForumNoticiasComponent implements OnInit {
   termoBusca: string = '';
  
    noticias: Noticia[] = [
        { titulo: 'Lorem Ipsum is simply', data: '22/12/2024 às 12:30', destinatario: 'Óculos do John de Russas'},
        { titulo: 'Lorem Ipsum is simply', data: '22/12/2024 às 12:30', destinatario: 'Óculos do John de Russas'},
        { titulo: 'Lorem Ipsum is simply', data: '22/12/2024 às 12:30', destinatario: 'Óculos do John de Russas'},
        { titulo: 'Lorem Ipsum is simply', data: '22/12/2024 às 12:30', destinatario: 'Óculos do John de Russas'},
        { titulo: 'Lorem Ipsum is simply', data: '22/12/2024 às 12:30', destinatario: 'Óculos do John de Russas'},
        { titulo: 'Lorem Ipsum is simply', data: '22/12/2024 às 12:30', destinatario: 'Óculos do John de Russas'},
        { titulo: 'Lorem Ipsum is simply', data: '22/12/2024 às 12:30', destinatario: 'Óculos do John de Russas'},
        { titulo: 'Lorem Ipsum is simply', data: '22/12/2024 às 12:30', destinatario: 'Óculos do John de Russas'}
  ];
      
  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.noticias.length / this.itensPorPagina);
  noticiasPaginadas: Noticia[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.atualizarPaginacao();
  }

  cadastrarNoticia(): void {
    this.router.navigate(['/usuario/cadastro-noticia']);
  }

  onSearch(searchTerm: string) {
    console.log('Search term:', searchTerm);
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.noticiasPaginadas = this.noticias.slice(inicio, fim);
  }

  get totalItens() {
    return this.noticias.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }
}
