import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lojas',
  templateUrl: './lojas.component.html',
  styleUrls: ['./lojas.component.css']
})
export class LojasComponent implements OnInit {

  termoBusca: string = '';

   constructor(private router: Router) { } 
      
    ngOnInit(): void {
    }
      
    cadastrarLoja(): void {
      this.router.navigate(['/usuario/cadastro-de-lojas']); 
    }

    buscarLoja(): void {
      console.log("Buscando loja:", this.termoBusca);
  }

}
