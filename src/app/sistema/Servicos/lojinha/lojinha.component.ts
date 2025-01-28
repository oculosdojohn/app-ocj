import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lojinha',
  templateUrl: './lojinha.component.html',
  styleUrls: ['./lojinha.component.css']
})
export class LojinhaComponent implements OnInit {

  constructor(private router: Router) { } 
    
  ngOnInit(): void {
  }
    
  cadastrarProduto(): void {
    this.router.navigate(['/usuario/cadastro-lojinha-produtos']); 
  }

}
