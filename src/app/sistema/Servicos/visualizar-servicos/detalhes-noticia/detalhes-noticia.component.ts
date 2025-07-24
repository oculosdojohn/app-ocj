import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NoticiasService } from 'src/app/services/funcionalidades/noticias.service';
import { Noticia } from '../../forum-noticias/noticia';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-detalhes-noticia',
  templateUrl: './detalhes-noticia.component.html',
  styleUrls: ['./detalhes-noticia.component.css'],
})
export class DetalhesNoticiaComponent implements OnInit {
  noticia!: Noticia;
  conteudoSanitizado: SafeHtml = '';

  constructor(
    private location: Location,
    private noticiasService: NoticiasService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.carregarNoticia();
  }

  goBack() {
    this.location.back();
  }

  carregarNoticia(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.noticiasService.getNoticiaById(id).subscribe(
        (response) => {
          this.noticia = response;
          this.conteudoSanitizado = this.sanitizer.bypassSecurityTrustHtml(
            this.noticia.conteudo || '-'
          );
          console.log('Dados da notícia carregados:', this.noticia);
        },
        (error) => {
          console.error('Erro ao carregar os dados da notícia:', error);
        }
      );
    }
  }

  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(url);
  }

  formatarDestinatariosArray(
    lojas: { nome: string; endereco?: { cidade?: string } }[] | undefined
  ): string[] {
    if (!lojas || lojas.length === 0) return ['-'];
    return lojas.map((l) => {
      const nome = l.nome || '';
      const cidade = l.endereco?.cidade ? ` - ${l.endereco.cidade}` : '';
      return nome + cidade;
    });
  }
}
