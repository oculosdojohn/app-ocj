import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-lojinha-produtos',
  templateUrl: './cadastro-lojinha-produtos.component.html',
  styleUrls: ['./cadastro-lojinha-produtos.component.css'],
})
export class CadastroLojinhaProdutosComponent implements OnInit {
  selectedImages: { [key: string]: File | null } = {};

  constructor(
    private location: Location,
  ) {}

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }

  onImageSelected(image: File | null, tipo: string) {
    this.selectedImages[tipo] = image;
    console.log(`Imagem de ${tipo} selecionada:`, image);
  }
}
