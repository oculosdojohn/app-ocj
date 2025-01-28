import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum-noticias',
  templateUrl: './forum-noticias.component.html',
  styleUrls: ['./forum-noticias.component.css']
})
export class ForumNoticiasComponent implements OnInit {

  constructor(private router: Router) { } 
  
    ngOnInit(): void {
    }
  
    cadastrarNoticia(): void {
      this.router.navigate(['/usuario/cadastro-noticia']); 
    }

}
