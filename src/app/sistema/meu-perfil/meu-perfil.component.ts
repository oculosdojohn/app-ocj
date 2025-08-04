import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ThemeService } from '../../services/modo-escuro/theme.service';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';
import { ErrorMessageService } from 'src/app/services/feedback/error-message.service';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.css'],
})
export class MeuPerfilComponent implements OnInit {
  isEditing = false;
  userId = 0;
  user = {
    username: '',
    loja: '',
    emailEmpresarial: '',
    emailPessoal: '',
    telefoneUm: '',
    telefoneDois: '',
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;
  messageTimeout: any;

  defaultImageUrl = '';
  selectedImageFile: File | null = null;
  selectedImageUrl: string | ArrayBuffer | null = null;

  showChangePassword = false;
  showForgotPassword: boolean = false;
  passwordVisible: { [key: string]: boolean } = {
    password: false,
    confirmPassword: false,
  };

  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private location: Location,
    public themeService: ThemeService,
    private colaboradorService: ColaboradorService,
    private errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.carregarPerfilUsuario();
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  goBack() {
    this.location.back();
  }

  toggleEdit() {
    this.isEditing = true;
  }

  carregarPerfilUsuario(): void {
    this.colaboradorService.getUsuarioPorToken().subscribe({
      next: (usuario) => {
        console.log('Usuário retornado pelo token:', usuario);
        this.userId = Number(usuario.id);
        this.user = {
          username: usuario.username || '',
          loja: usuario.loja?.nome || '',
          emailEmpresarial: usuario.emailEmpresarial || '',
          emailPessoal: usuario.emailPessoal || '',
          telefoneUm: usuario.telefoneUm || '',
          telefoneDois: usuario.telefoneDois || '',
        };
        if (usuario.foto?.documentoUrl) {
          this.selectedImageUrl = usuario.foto.documentoUrl;
        } else {
          this.selectedImageUrl = this.defaultImageUrl;
        }
      },
      error: (error) => {
        console.error('Erro ao carregar perfil do usuário:', error);
      },
    });
  }

  cancelEdit() {
    this.isEditing = false;
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.selectedImageUrl = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  getInitial(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '?';
  }

  getRandomColor(seed: string): string {
    const colors = [
      '#FFB3BA', // Rosa pastel
      '#FFDFBA', // Laranja pastel
      '#BAFFC9', // Verde pastel
      '#BAE1FF', // Azul pastel
      '#D5BAFF', // Roxo pastel
    ];
    const index = seed ? seed.charCodeAt(0) % colors.length : 0;
    return colors[index];
  }

  saveChanges() {
    this.clearMessage();

    const formData = new FormData();
    const perfil = {
      username: this.user.username,
      emailEmpresarial: this.user.emailEmpresarial,
      emailPessoal: this.user.emailPessoal,
      telefoneUm: this.user.telefoneUm,
      telefoneDois: this.user.telefoneDois,
    };

    formData.append('perfil', JSON.stringify(perfil));

    if (this.selectedImageFile) {
      formData.append('foto', this.selectedImageFile);
    }
    console.log('Enviando para atualizarPerfilUsuario:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    this.colaboradorService
      .atualizarPerfilUsuario(this.userId, formData)
      .subscribe({
        next: (response) => {
          this.isEditing = false;
          this.showMessage('success', 'Perfil atualizado com sucesso!');
        },
        error: (error) => {
          this.showMessage(
            'error',
            error.message || 'Erro ao atualizar o perfil.'
          );
          console.error('Erro ao atualizar perfil:', error);
        },
      });
  }

  showMessage(type: 'success' | 'error', msg: string) {
    this.clearMessage();
    if (type === 'success') this.successMessage = msg;
    if (type === 'error') this.errorMessage = msg;
    this.messageTimeout = setTimeout(() => this.clearMessage(), 3000);
  }

  clearMessage() {
    this.successMessage = null;
    this.errorMessage = null;
    if (this.messageTimeout) clearTimeout(this.messageTimeout);
  }

  toggleChangePassword() {
    this.showChangePassword = !this.showChangePassword;
  }

  changePassword() {
    if (!this.oldPassword && !this.newPassword && !this.confirmPassword) {
      this.showMessage('error', 'Preencha todos os campos.');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.showMessage('error', 'As senhas não coincidem.');
      return;
    }

    const dto = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
    };

    this.colaboradorService
      .redefinirSenha({
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
      })
      .subscribe({
        next: () => {
          this.showChangePassword = false;
          this.showMessage('success', 'Senha alterada com sucesso!');
          this.oldPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';
        },
        error: (error) => {
          let msg = '';
          if (error.status) {
            msg = this.errorMessageService.getErrorMessage(
              error.status,
              'PUT',
              'senha'
            );
          }
          if (error.error?.message) {
            msg = error.error.message;
          }
          this.showMessage('error', msg || 'Erro ao alterar a senha.');
        },
      });
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

  get senhaMin8(): boolean {
    return (this.newPassword?.length ?? 0) >= 8;
  }
  get senhaMaiuscula(): boolean {
    return /[A-Z]/.test(this.newPassword || '');
  }
  get senhaMinuscula(): boolean {
    return /[a-z]/.test(this.newPassword || '');
  }
  get senhaNumero(): boolean {
    return /\d/.test(this.newPassword || '');
  }
  get senhaEspecial(): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(this.newPassword || '');
  }
}
