import { Component, OnInit, Input, HostListener, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-multiplo-select',
  templateUrl: './multiplo-select.component.html',
  styleUrls: ['./multiplo-select.component.css'],
})
export class MultiploSelectComponent {
  @Input() label: string = '';
  @Input() options: any[] = [];
  @Input() selectedValue: any[] | any;
  @Output() selectedValueChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() customStyles: { [key: string]: string } = {};
  @Input() multiple: boolean = false;

  isOpen: boolean = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (this.multiple && !Array.isArray(this.selectedValue)) {
      this.selectedValue = [];
    } else if (!this.multiple) {
      this.selectedValue = null;
    }
  }

  onSelect(value: any) {
    if (this.multiple) {
      if (Array.isArray(this.selectedValue)) {
        if (this.selectedValue.includes(value)) {
          // Remove o valor se ele já estiver selecionado
          this.selectedValue = this.selectedValue.filter(
            (item: any) => item !== value
          );
        } else {
          // Adiciona o valor ao array
          this.selectedValue.push(value);
        }
      }
      this.selectedValueChange.emit(this.selectedValue); // Emitir o array atualizado
    } else {
      // Comportamento padrão para seleção única
      this.selectedValue = value;
      this.selectedValueChange.emit(value);
    }
    this.isOpen = false;
  }

  removeValue(value: any) {
    if (this.multiple && Array.isArray(this.selectedValue)) {
      this.selectedValue = this.selectedValue.filter(
        (item: any) => item !== value
      );
      this.selectedValueChange.emit(this.selectedValue);
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
