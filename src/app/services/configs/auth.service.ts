import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../login/usuario';
import { map } from 'rxjs/internal/operators/map';
import { Permissao } from '../../login/permissao';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL: string = environment.apiURLBase + '/api/usuarios';
  tokenURL: string = environment.apiURLBase + environment.obterTokenUrl;
  clientID: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {}

  obterToken() {
    return localStorage.getItem('access_token');
  }

  encerrarSessao() {
    localStorage.removeItem('access_token');
  }

  obterUsuarioAutenticadoDoBackend(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiURL}/perfil`).pipe(
      map((usuario) => {
        usuario.permissao = this.jwtHelper.decodeToken(
          this.obterToken() || ''
        )?.role;
        return usuario;
      })
    );
  }

  getUsuarioAutenticado(): Usuario | null {
    const userJson = localStorage.getItem('usuario');
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }

  getUserIdFromToken(): string | null {
    const token = this.obterToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.sub || null;
    }
    return null;
  }

  salvarUsuarioAutenticado(usuario: Usuario) {
    const token = this.obterToken();
    if (token) {
      const userId = this.getUserIdFromToken();
    }
  }

  isAuthenticated(): boolean {
    const token = this.obterToken();
    if (token) {
      const expired = this.jwtHelper.isTokenExpired(token);

      return !expired;
    }
    return false;
  }

  resetPassword(token: string, newPassword: string) {
    const body = { newPassword: newPassword };
    return this.http.put(
      `${this.apiURL}/reset-password/${encodeURIComponent(token)}`,
      body,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: false,
      }
    );
  }

  obterPerfilUsuario(): Observable<Usuario> {
    const token = this.obterToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.get<Usuario>(`${this.apiURL}/token`, { headers }).pipe(
      map((response) => {
        console.log('Resposta do endpoint /token:', response);
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro ao obter perfil do usuário:', error);
        return throwError(
          'Erro ao obter perfil do usuário. Por favor, tente novamente.'
        );
      })
    );
  }

  public visualizarUsuarioPorId(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiURL}/visualizarUsuario/${id}`);
  }

  salvar(usuario: Usuario, perm: Permissao): Observable<any> {
    const { permissao: userPermissao } = this.getUsuarioAutenticado() || {};

    let request: Observable<any>;
    if (userPermissao === Permissao.ADMIN && perm === Permissao.RH.valueOf()) {
      request = this.cadastrarRh(usuario);
    } else {
      request = this.cadastrarColaborador(usuario);
    }

    return request.pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 422) {
          return throwError('usuário já cadastrado na base de dados');
        }
        return throwError(error);
      })
    );
  }

  private cadastrarColaborador(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiURL}/cadastro/COLABORADOR`, usuario).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 422) {
          return throwError('Usuário já cadastrado na base de dados');
        }
        return throwError('O servidor não está funcionando corretamente.');
      })
    );
  }

  private cadastrarRh(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiURL}/cadastro/RH`, usuario).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 422) {
          return throwError('Usuário já cadastrado na base de dados');
        }
        return throwError('O servidor não está funcionando corretamente.');
      })
    );
  }

  public visualizarColaboradores(): Observable<Usuario[] | null> {
    return this.http
      .get<Usuario[]>(`${this.apiURL}/visualizar/RH`, {
        observe: 'response',
      })
      .pipe(
        map((response) => {
          if (response.status === 204) {
            return null;
          }
          return response.body || null;
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(
            'Erro ao visualizar colaboradores. Por favor, tente novamente.'
          );
        })
      );
  }

  public visualizarUsuarios(): Observable<Usuario[] | null> {
    return this.http
      .get<Usuario[]>(`${this.apiURL}/visualizar/ADMIN`, {
        observe: 'response',
      })
      .pipe(
        map((response) => {
          if (response.status === 204) {
            return null;
          }
          return response.body || null;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Erro ao visualizar os usuários: ', error);
          return throwError(
            'Erro ao visualizar os usuários. Por favor, tente novamente.'
          );
        })
      );
  }

  tentarLogar(email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', email)
      .set('password', password)
      .set('grant_type', 'password');

    const headers = {
      Authorization: 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    console.log('Tentando autenticar usuário com email:', email); // Log do email enviado
    return this.http.post(this.tokenURL, params.toString(), { headers }).pipe(
      map((response: any) => {
        console.log('Resposta do backend (token recebido):', response); // Log da resposta do backend
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro ao autenticar o usuário:', error); // Log de erro
        return throwError('Erro ao autenticar. Verifique suas credenciais.');
      })
    );
  }
}
