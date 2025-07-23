import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-midias',
  templateUrl: './input-midias.component.html',
  styleUrls: ['./input-midias.component.css'],
})
export class InputMidiasComponent implements OnInit {
  @Input() label: string = 'Clique ou arraste a imagem/vídeo para fazer upload';
  @Input() inputId: string = 'midia';
  @Output() midiaSelected = new EventEmitter<File | null>();
  @Output() fileRemoved = new EventEmitter<void>();
  @Input() midiaPreview: string | ArrayBuffer | null = null;

  selectedFile: File | null = null;
  fileType: 'image' | 'video' | null = null;

  constructor() {}

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.processFile(file, input);
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      const inputElement = document.getElementById(
        this.inputId
      ) as HTMLInputElement;
      this.processFile(file, inputElement);
    }
  }

  processFile(file: File, inputElement: HTMLInputElement): void {
    // ✅ Validar tipo de arquivo
    if (!this.isValidFileType(file)) {
      alert(
        'Tipo de arquivo não suportado. Use apenas imagens (JPG, PNG, GIF) ou vídeos (MP4, AVI, MOV).'
      );
      this.clearInput(inputElement);
      return;
    }

    this.selectedFile = file;
    this.fileType = this.getFileType(file);

    const reader = new FileReader();
    reader.onload = () => {
      this.midiaPreview = reader.result as string;
      this.midiaSelected.emit(file);
    };

    reader.readAsDataURL(file);

    // ✅ Atualizar o input file
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    inputElement.files = dataTransfer.files;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  // ✅ Verificar se é imagem
  isPreviewImage(preview: string | ArrayBuffer): boolean {
    return (
      typeof preview === 'string' &&
      (preview.startsWith('data:image/') || preview.startsWith('http'))
    );
  }

  // ✅ Verificar se é vídeo
  isPreviewVideo(preview: string | ArrayBuffer): boolean {
    return (
      typeof preview === 'string' &&
      (preview.startsWith('data:video/') || preview.startsWith('http'))
    );
  }

  // ✅ Validar tipo de arquivo
  private isValidFileType(file: File): boolean {
    const validImageTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
    ];
    const validVideoTypes = [
      'video/mp4',
      'video/avi',
      'video/mov',
      'video/wmv',
      'video/webm',
    ];

    return (
      validImageTypes.includes(file.type) || validVideoTypes.includes(file.type)
    );
  }

  // ✅ Determinar tipo do arquivo
  private getFileType(file: File): 'image' | 'video' {
    return file.type.startsWith('image/') ? 'image' : 'video';
  }

  // ✅ Limpar input
  private clearInput(inputElement: HTMLInputElement): void {
    inputElement.value = '';
  }

  // ✅ Remover arquivo
  removeFile(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.midiaPreview = null;
    this.selectedFile = null;
    this.fileType = null;

    const inputElement = document.getElementById(
      this.inputId
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }

    this.fileRemoved.emit();
    console.log('Arquivo removido');
  }

  // ✅ Obter ícone baseado no tipo
  getUploadIcon(): string {
    return 'assets/icones/image.svg'; // Ícone padrão
  }

  // ✅ Obter nome do arquivo
  getFileName(): string {
    return this.selectedFile ? this.selectedFile.name : '';
  }

  // ✅ Obter tamanho do arquivo formatado
  getFileSize(): string {
    if (!this.selectedFile) return '';

    const sizeInMB = this.selectedFile.size / (1024 * 1024);
    if (sizeInMB < 1) {
      return `${(this.selectedFile.size / 1024).toFixed(1)} KB`;
    }
    return `${sizeInMB.toFixed(1)} MB`;
  }
}
