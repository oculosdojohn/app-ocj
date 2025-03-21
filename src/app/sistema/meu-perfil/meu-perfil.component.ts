import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ThemeService } from '../../services/modo-escuro/theme.service';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.css'],
})
export class MeuPerfilComponent implements OnInit {
  isEditing = false;
  user = {
    name: 'Johnatta',
    loja: 'Loja de Russas',
    emailEmpressarial: 'johnatta@gmail.com',
    emailPessoal: 'johnatta2@gmail.com',
    telefone1: '(00) 9 0000-0000',
    telefone2: '(00) 9 0000-0000',
  };

  defaultImageUrl = 'assets/imgs/default-profile.png';
  selectedImageUrl: string | ArrayBuffer | null = null;

  constructor(private location: Location, public themeService: ThemeService) {}

  ngOnInit(): void {}

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  goBack() {
    this.location.back();
  }

  toggleEdit() {
    this.isEditing = true;
  }

  saveChanges() {
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.selectedImageUrl = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
