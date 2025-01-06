import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;
  email!: string;
  nomeDaEmpresa!: string;
  setorDaEmpresa!: string;
  cadastrando!: boolean;
  mensagemSucesso!: string;
  errors!: String[];
  usuario: any;

  constructor(
    private router: Router,

  ) {}

  
  ngOnInit(): void {
  }



onSubmit() {
  this.router.navigate(['usuario/dashboard-admin']);
}

login() {
  this.router.navigate(['roles-user']);
}

  preparaCadastrar(event: { preventDefault: () => void; }){
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro(){
    this.cadastrando = false;
  }

  cadastrar(){
 
  }


  salvaUserLocal(){


  }

}