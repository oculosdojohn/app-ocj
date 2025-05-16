import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permissao } from 'src/app/login/permissao';
import { AuthService } from 'src/app/services/configs/auth.service';

@Component({
  selector: 'app-lojinha',
  templateUrl: './lojinha.component.html',
  styleUrls: ['./lojinha.component.css']
})
export class LojinhaComponent implements OnInit {

  public Permissao = Permissao;
  public cargoUsuario!: Permissao;

  constructor(
    private router: Router,
    private authService: AuthService  
  ) { }

  ngOnInit(): void {
    this.authService.obterPerfilUsuario().subscribe(usuario => {
      this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
    });
  }

  cadastrarProduto(): void {
    this.router.navigate(['/usuario/cadastro-lojinha-produtos']); 
  }

}
