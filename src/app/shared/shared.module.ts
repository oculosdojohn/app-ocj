import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectPadraoComponent } from './select-padrao/select-padrao.component';
import { InputImgComponent } from './input-img/input-img.component';
import { ModalGeralComponent } from './modal-geral/modal-geral.component';
import { InputArquivosComponent } from './input-arquivos/input-arquivos.component';
import { MultiploSelectComponent } from './multiplo-select/multiplo-select.component';
import { PlaylistVideoComponent } from './playlist-video/playlist-video.component';
import { InputVideoComponent } from './input-video/input-video.component';
import { SearchComponent } from './search/search.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SectorNavigationComponent } from './sector-navigation/sector-navigation.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';



@NgModule({
  declarations: [
    SelectPadraoComponent,
    InputImgComponent,
    ModalGeralComponent,
    InputArquivosComponent,
    MultiploSelectComponent,
    PlaylistVideoComponent,
    InputVideoComponent,
    SearchComponent,
    PaginationComponent,
    SectorNavigationComponent,
    ModalDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SelectPadraoComponent,
    InputImgComponent,
    ModalGeralComponent,
    InputArquivosComponent,
    MultiploSelectComponent,
    PlaylistVideoComponent,
    InputVideoComponent,
    SearchComponent,
    PaginationComponent,
    SectorNavigationComponent,
    ModalDeleteComponent
  ]
})
export class SharedModule { }
