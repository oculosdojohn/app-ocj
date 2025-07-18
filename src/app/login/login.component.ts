import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/configs/auth.service';
import { Usuario } from './usuario';
import { Permissao } from './permissao';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
  

  showForgotPassword: boolean = false;
  passwordVisible: { [key: string]: boolean } = {
    password: false,
    confirmPassword: false,
  };

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('user_id');
  
    this.authService.tentarLogar(this.email, this.password).subscribe(
      (response: any) => {
        const access_token = response.access_token;
        localStorage.setItem('access_token', access_token);

        const userId = this.authService.getUserIdFromToken() ?? '';
        localStorage.setItem('user_id', userId || '');

        const usuario: Usuario = {
          id: userId,
          username: response.username,
          password: '',
          emailPessoal: response.emailPessoal || '',
          confirmPassword: '',
          permissao:
          response.authorities.length > 0
            ? (typeof response.authorities[0] === 'string'
                ? response.authorities[0]
                : response.authorities[0].authority)
            : null,
          foto: response.foto || '',
          cargo: response.cargo || '',
          qtdMoedas: response.qtdMoedas || 0,
        };
        localStorage.setItem('usuario', JSON.stringify(usuario));
         // console.log('Permissão do usuário:', usuario.permissao);
        switch (usuario.permissao) {
          case Permissao.ADMIN:
          case Permissao.DIRETOR:
            this.router.navigate(['/usuario/dashboard-administracao']);
            break;
          case Permissao.RH:
            this.router.navigate(['/usuario/dashboard-rh']);
            break;
          case Permissao.GERENTE_GERAL:
          case Permissao.SUPERVISOR:
          case Permissao.GERENTE:
          this.router.navigate(['/usuario/dashboard-gerentes']);
          break;
          case Permissao.VENDEDOR:
          case Permissao.CONSULTOR_VENDAS:
          case Permissao.FINANCEIRO:
          case Permissao.COBRADOR:
          case Permissao.ESTAGIARIO:
            this.router.navigate(['/usuario/dashboard-colaborador']);
            break;
          default:
            this.router.navigate(['/forbidden']);
            break;
        }
      },
      (errorResponse) => {
        this.errors = ['E-mail e/ou senha incorreto(s).'];
      }
    );
  }

  login() {
    this.router.navigate(['roles-user']);
  }

  preparaCadastrar(event: { preventDefault: () => void }) {
    event.preventDefault();
    this.cadastrando = true;
  }



  togglePasswordVisibility(field: string) {
    this.passwordVisible[field] = !this.passwordVisible[field];
    const passwordInput = document.querySelector(`input[name="${field}"]`);
    if (passwordInput) {
      passwordInput.setAttribute(
        'type',
        this.passwordVisible[field] ? 'text' : 'password'
      );
    }
  }
}
