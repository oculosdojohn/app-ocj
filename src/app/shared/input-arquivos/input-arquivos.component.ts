import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-arquivos',
  templateUrl: './input-arquivos.component.html',
  styleUrls: ['./input-arquivos.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputArquivosComponent),
      multi: true,
    },
  ],
})
export class InputArquivosComponent {
  @Input() label: string = 'Clique ou arraste o arquivo para fazer upload';
  @Output() arquivosSelecionados = new EventEmitter<
    (File | { id: number; name: string; documentoUrl: string })[]
  >();

  successMessage: string | null = null;
  errorMessage: string | null = null;
  arquivos: (File | { id: number; name: string; documentoUrl: string })[] = [];
  onChange: (
    value: (File | { id: number; name: string; documentoUrl: string })[]
  ) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {}

  ngOnInit(): void {
    console.log('InputArquivosComponent inicializado');
  }

  writeValue(
    value: (File | { id: number; name: string; documentoUrl: string })[]
  ): void {
    console.log('Arquivos recebidos no writeValue:', value);
    this.arquivos = value || [];
    console.log('Arquivos armazenados no componente:', this.arquivos);
  }

  registerOnChange(
    fn: (
      value: (File | { id: number; name: string; documentoUrl: string })[]
    ) => void
  ): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onPdfSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.adicionarArquivos(Array.from(input.files));
    }
  }

  removePdf(index: number): void {
    this.arquivos.splice(index, 1);
    this.onChange([...this.arquivos]);
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
      if (!this.arquivos.some((a) => this.isSameArquivo(a, arquivo))) {
        this.arquivos.push(arquivo);
      }
    }

    this.onChange([...this.arquivos]);
    this.arquivosSelecionados.emit([...this.arquivos]);
    this.errorMessage = null;
  }

  isSameArquivo(
    a: File | { id: number; name: string; documentoUrl: string },
    b: File | { id: number; name: string; documentoUrl: string }
  ): boolean {
    if (a instanceof File && b instanceof File) {
      return a.name === b.name && a.size === b.size;
    }
    if ('documentoUrl' in a && 'documentoUrl' in b) {
      return a.documentoUrl === b.documentoUrl;
    }
    return false;
  }

  isArquivoComUrl(
    arquivo: File | { id: number; name: string; documentoUrl: string }
  ): boolean {
    return !(arquivo instanceof File);
  }

  arquivoHasDocumentoUrl(
    arquivo: File | { id: number; name: string; documentoUrl: string }
  ): arquivo is { id: number; name: string; documentoUrl: string } {
    return (arquivo as { documentoUrl: string }).documentoUrl !== undefined;
  }
}
