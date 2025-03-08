import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicina',
  templateUrl: './medicina.component.html',
  styleUrls: ['./medicina.component.css']
})
export class MedicinaComponent implements OnInit {

  termoBusca: string = '';
 
   constructor(private router: Router) { } 
      
    ngOnInit(): void {
    }
      
    cadastrarExame(): void {
      this.router.navigate(['/usuario/cadastro-de-procedimentos-medicos']); 
    }
 
    buscarDepartamento(): void {
     console.log("Buscando departamento:", this.termoBusca);
 }

}
