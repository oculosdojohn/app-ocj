import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  constructor(private router: Router) { } 
     
   ngOnInit(): void {
   }
     
   cadastrarDepartamento(): void {
     this.router.navigate(['/usuario/cadastro-de-departamento']); 
   }

}
