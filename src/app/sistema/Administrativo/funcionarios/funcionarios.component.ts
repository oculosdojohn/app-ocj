import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {

   constructor(private router: Router) { } 
      
  ngOnInit(): void {
  }
      
  cadastrarColaborador(): void {
      this.router.navigate(['/usuario/cadastro-de-colaborador']); 
  }

}
