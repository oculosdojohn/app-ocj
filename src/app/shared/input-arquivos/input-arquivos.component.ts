import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-arquivos',
  templateUrl: './input-arquivos.component.html',
  styleUrls: ['./input-arquivos.component.css'],
})
export class InputArquivosComponent {
  @Input() label: string = 'Clique ou arraste o arquivo para fazer upload';
  @Output() arquivosSelecionados = new EventEmitter<File[]>();

  successMessage: string | null = null;
  errorMessage: string | null = null;
  arquivos: File[] = [];

  constructor() {}

  ngOnInit(): void {}

  onPdfSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.adicionarArquivos(Array.from(input.files));
    }
  }

  removePdf(index: number): void {
    this.arquivos.splice(index, 1);
    this.arquivosSelecionados.emit([...this.arquivos]);
    if (this.arquivos.length < 3) {
      this.errorMessage = null;
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      this.adicionarArquivos(Array.from(event.dataTransfer.files));
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  adicionarArquivos(novosArquivos: File[]): void {
    if (this.arquivos.length + novosArquivos.length > 3) {
      this.errorMessage = 'Você pode enviar no máximo 3 arquivos PDF.';
      return;
    }

    for (let arquivo of novosArquivos) {
      if (!this.arquivos.some((a) => a.name === arquivo.name)) {
        this.arquivos.push(arquivo);
      }
    }

    this.arquivosSelecionados.emit([...this.arquivos]);
    this.errorMessage = null;
  }
}
