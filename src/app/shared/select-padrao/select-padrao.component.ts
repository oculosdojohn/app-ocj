import {
  Component,
  Input,
  HostListener,
  Output,
  EventEmitter,
  ElementRef,
  Renderer2,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-padrao',
  templateUrl: './select-padrao.component.html',
  styleUrls: ['./select-padrao.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectPadraoComponent),
      multi: true,
    },
  ],
})
export class SelectPadraoComponent {
  @Input() label: string = '';
  @Input() options: { value: string, description: string }[] = [];
  @Input() selectedValue: string = '';
  @Output() selectedValueChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() customStyles: { [key: string]: string } = {};
  @Input() disabled: boolean = false;


  isOpen: boolean = false;
  onChange = (value: string) => {};
  onTouched = () => {};
  value: string = '';

  constructor(private elementRef: ElementRef) {}

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelect(option: { value: string, description: string }) {
    console.log('Selecionado:', option);
    this.selectedValue = option.value;
    this.value = option.value;
    this.onChange(this.value);
    this.onTouched();
    this.selectedValueChange.emit(this.selectedValue);
    this.isOpen = false;
  }

  getSelectedDescription(): string {
    const selectedOption = this.options.find(option => option.value === this.selectedValue);
    return selectedOption ? selectedOption.description : '';
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
