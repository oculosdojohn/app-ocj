import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gerentes',
  templateUrl: './gerentes.component.html',
  styleUrls: ['./gerentes.component.css']
})
export class GerentesComponent implements OnInit {

   constructor(private router: Router) { } 
      
    ngOnInit(): void {
    }
      
    cadastrarGerente(): void {
      this.router.navigate(['/usuario/cadastro-de-gerente']); 
    }

}
