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
  isLoading = false;

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
            response.authorities.length > 0 ? response.authorities[0] : null,
          foto: response.foto || '',
          cargo: response.cargo || '',
        };
        localStorage.setItem('usuario', JSON.stringify(usuario));
        console.log('Permissão do usuário:', usuario.permissao);
  
        this.isLoading = false; // ✅ libera novamente
  
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
        this.isLoading = false;
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
