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
            response.authorities.length > 0 ? response.authorities[0] : null,
          foto: response.foto || '',
          cargo: response.cargo || '',
        };
        localStorage.setItem('usuario', JSON.stringify(usuario));
         // Adicione o console log aqui
         console.log('Permissão do usuário:', usuario.permissao);

        switch (usuario.permissao) {
          case Permissao.ADMIN:
            this.router.navigate(['/usuario/dashboard-admin']);
            break;
          case Permissao.RH:
            this.router.navigate(['/usuario/dashboard-rh']);
            break;
          case Permissao.GERENTE_GERAL:
          case Permissao.GERENTE:
            this.router.navigate(['/usuario/dashboard-gerente']);
            break;
          case Permissao.SUPERVISOR:
          case Permissao.VENDEDOR:
          case Permissao.COLABORADOR:
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

  salvaUserLocal() {
    this.authService.obterUsuarioAutenticadoDoBackend().subscribe(
      (usuario: Usuario) => {
        this.usuario = usuario;
        localStorage.setItem('idUser', usuario.id);
        this.router.navigate(['/usuario/inicio']);
        localStorage.setItem('usuario', usuario.username);
      },
      (error) => {
        console.error('Erro ao obter dados do usuário:', error);
      }
    );
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
