import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit {

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
