import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPadraoComponent } from './select-padrao/select-padrao.component';
import { InputImgComponent } from './input-img/input-img.component';
import { ModalGeralComponent } from './modal-geral/modal-geral.component';
import { InputArquivosComponent } from './input-arquivos/input-arquivos.component';
import { MultiploSelectComponent } from './multiplo-select/multiplo-select.component';
import { PlaylistVideoComponent } from './playlist-video/playlist-video.component';
import { InputVideoComponent } from './input-video/input-video.component';



@NgModule({
  declarations: [
    SelectPadraoComponent,
    InputImgComponent,
    ModalGeralComponent,
    InputArquivosComponent,
    MultiploSelectComponent,
    PlaylistVideoComponent,
    InputVideoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SelectPadraoComponent,
    InputImgComponent,
    ModalGeralComponent,
    InputArquivosComponent,
    MultiploSelectComponent,
    PlaylistVideoComponent,
    InputVideoComponent
  ]
})
export class SharedModule { }
