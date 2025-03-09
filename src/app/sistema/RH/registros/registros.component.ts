import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css'],
})
export class RegistrosComponent implements OnInit {
  termoBusca: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  cadastrarRegistro(): void {
    this.router.navigate(['/usuario/cadastro-de-registro']);
  }

  onSearch(searchTerm: string) {
    console.log('Search term:', searchTerm);
  }
}
