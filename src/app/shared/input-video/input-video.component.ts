import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-video',
  templateUrl: './input-video.component.html',
  styleUrls: ['./input-video.component.css']
})
export class InputVideoComponent {
  @Input() label: string = 'Clique ou arraste o video para fazer upload';
  @Input() inputId: string = 'video';
  @Output() videoSelected = new EventEmitter<File | null>();
  @Input() videoPreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null; 

  constructor() { }

  ngOnInit(): void {
  }

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
      const inputElement = document.getElementById(this.inputId) as HTMLInputElement;
      this.processFile(file, inputElement);
    }
  }

  processFile(file: File, inputElement: HTMLInputElement): void {
    this.selectedFile = file;
    const reader = new FileReader();

    reader.onload = () => {
      this.videoPreview = reader.result as string;
      this.videoSelected.emit(file);
    };

    reader.readAsDataURL(file);

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    inputElement.files = dataTransfer.files;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  isPreviewVideo(preview: string | ArrayBuffer): boolean {
    return typeof preview === 'string' && (preview.startsWith('data:video/') || preview.startsWith('http'));
  }
  
}
