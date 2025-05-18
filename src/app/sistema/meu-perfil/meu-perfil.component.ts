import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ThemeService } from '../../services/modo-escuro/theme.service';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';

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

  defaultImageUrl = 'assets/imgs/default-profile.png';
  selectedImageFile: File | null = null;
  selectedImageUrl: string | ArrayBuffer | null = null;

  constructor(
    private location: Location,
    public themeService: ThemeService,
    private colaboradorService: ColaboradorService
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

  saveChanges() {
    const formData = new FormData();
    const perfil = {
      username: this.user.username,
      loja: this.user.loja,
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
          console.log('Perfil atualizado com sucesso:', response);
        },
        error: (error) => {
          console.error('Erro ao atualizar perfil:', error);
        },
      });
  }
}
