import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-buscar-aulas',
  templateUrl: './buscar-aulas.component.html',
  styleUrls: ['./buscar-aulas.component.css'],
})
export class BuscarAulasComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }
}
