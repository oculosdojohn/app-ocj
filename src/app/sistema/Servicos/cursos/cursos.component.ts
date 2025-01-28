import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  constructor(private router: Router) { } 

  ngOnInit(): void {
  }

  cadastrarAula(): void {
    this.router.navigate(['/usuario/cadastro-de-aulas']); 
  }

}
