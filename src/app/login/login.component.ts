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

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

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
          email: response.email || '',
          nome: response.nome || '',
          confirmPassword: '', 
          permissao: response.authorities.length > 0 ? response.authorities[0] : null,
          fotoUrl: response.fotoUrl || '',
          nomeDaEmpresa: response.nomeDaEmpresa || '',
          setorDaEmpresa: response.setorDaEmpresa || '' 
        };
        localStorage.setItem('usuario', JSON.stringify(usuario));

        if (usuario.permissao === Permissao.ADMIN || usuario.permissao === Permissao.RH || 
            usuario.permissao === Permissao.COLABORADOR) {
          this.router.navigate(['/usuario/dashboard-admin']);
        } else {
          this.router.navigate(['/forbidden']);
        }
      },
      errorResponse => {
        this.errors = ['Usuário e/ou senha incorreto(s).'];
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
}
