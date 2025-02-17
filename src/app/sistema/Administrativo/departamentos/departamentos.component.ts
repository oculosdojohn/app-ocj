import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  termoBusca: string = '';

  constructor(private router: Router) { } 
     
   ngOnInit(): void {
   }
     
   cadastrarDepartamento(): void {
     this.router.navigate(['/usuario/cadastro-de-departamento']); 
   }

   buscarDepartamento(): void {
    console.log("Buscando departamento:", this.termoBusca);
}
}
