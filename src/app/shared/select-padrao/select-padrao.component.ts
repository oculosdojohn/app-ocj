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
  @Input() options: { value: string; description: string }[] = [];
  @Input() selectedValue: string = '';
  @Output() selectedValueChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() customStyles: { [key: string]: string } = {};
  @Input() disabled: boolean = false;

  isOpen: boolean = false;
  onChange = (value: string) => {};
  onTouched = () => {};
  value: string = '';
  filteredOptions: { value: string; description: string }[] = [];
  searchText: string = '';
  searchTimeout: any;
  highlightedValue: string = '';

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.filteredOptions = [...this.options];
  }

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

  onSelect(option: { value: string; description: string }) {
    console.log('Selecionado:', option);
    this.selectedValue = option.value;
    this.value = option.value;
    this.onChange(this.value);
    this.onTouched();
    this.selectedValueChange.emit(this.selectedValue);
    this.isOpen = false;
  }

  getSelectedDescription(): string {
    const selectedOption = this.options.find(
      (option) => option.value === this.selectedValue
    );
    return selectedOption ? selectedOption.description : '';
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.isOpen) {
      clearTimeout(this.searchTimeout);

      this.searchText += event.key.toLowerCase();


      const matchingOptionIndex = this.options.findIndex((option) =>
        option.description.toLowerCase().startsWith(this.searchText)
      );

      if (matchingOptionIndex !== -1) {
        this.highlightedValue = this.options[matchingOptionIndex].value;
        const optionElement = document.querySelector(
          `.option[data-value="${this.highlightedValue}"]`
        );
        optionElement?.scrollIntoView({ behavior: 'auto', block: 'center' });
      }

      this.searchTimeout = setTimeout(() => {
        this.searchText = '';
      }, 500);
    }
  }
}
