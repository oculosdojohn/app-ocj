import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/configs/auth.service';
import { ErrorMessageService } from 'src/app/services/feedback/error-message.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';
  token: string | null = null;
  mensagemSucesso: string = '';
  errors: string[] = [];

  passwordVisible: { [key: string]: boolean } = {
    password: false,
    confirmPassword: false,
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    const queryParams = new URLSearchParams(window.location.search);
    this.token = queryParams.get('token');
    console.log(this.token);
  }

  goToResetPassword() {
    this.errors = [];

    const queryParams = new URLSearchParams(window.location.search);
    this.token = queryParams.get('token');
    console.log('[ResetPassword] Token usado para envio:', this.token);

    if (!this.token) {
      this.errors.push('Token inválido ou expirado.');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errors.push('As senhas não coincidem.');
      return;
    }

    console.log('[ResetPassword] Enviando nova senha:', this.newPassword);

    this.authService.resetPassword(this.token, this.newPassword).subscribe(
      (response: any) => {
        console.log('[ResetPassword] Resposta do backend:', response);
        this.mensagemSucesso =
          response?.message || 'Senha redefinida com sucesso!';
        this.confirmPassword = '';
        this.newPassword = '';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      (error) => {
        const msg = this.errorMessageService.getErrorMessage(
          error.status,
          'PUT',
          'senha'
        );
        this.errors = [msg];
        console.error('[ResetPassword] Erro ao redefinir senha:', error);
        if (error.error) {
          console.error(
            '[ResetPassword] Mensagem detalhada do backend:',
            error.error
          );
        }
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
