import { Component, OnInit, Input, Type, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sector-navigation',
  templateUrl: './sector-navigation.component.html',
  styleUrls: ['./sector-navigation.component.css'],
})
export class SectorNavigationComponent {
  @Input() sectors: { name: string; id: string }[] = [];
  @Input() componentMap!: { [key: string]: Type<any> };
  @Output() sectorChange = new EventEmitter<string>();

  activeIndex: number = 0;

  constructor() {}

  get activeComponent(): Type<any> | null {
    const id = this.sectors[this.activeIndex]?.id;
    return this.componentMap?.[id] || null;
  }

  selectSector(index: number): void {
    this.activeIndex = index;
    this.sectorChange.emit(this.sectors[index].id);
  }
}
