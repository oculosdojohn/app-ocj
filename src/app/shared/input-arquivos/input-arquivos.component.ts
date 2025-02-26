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
      for (let i = 0; i < input.files.length; i++) {
        if (this.arquivos.length < 3) {
          this.arquivos.push(input.files[i]);
        } else {
          this.errorMessage = 'Você pode enviar no máximo 3 arquivos PDF.';
          break;
        }
      }
    }
  }

  removePdf(index: number): void {
    this.arquivos.splice(index, 1);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        this.arquivos.push(event.dataTransfer.files[i]);
      }
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }
}
