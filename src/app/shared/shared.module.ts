import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPadraoComponent } from './select-padrao/select-padrao.component';
import { InputImgComponent } from './input-img/input-img.component';
import { ModalGeralComponent } from './modal-geral/modal-geral.component';
import { InputArquivosComponent } from './input-arquivos/input-arquivos.component';



@NgModule({
  declarations: [
    SelectPadraoComponent,
    InputImgComponent,
    ModalGeralComponent,
    InputArquivosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SelectPadraoComponent,
    InputImgComponent,
    ModalGeralComponent,
    InputArquivosComponent
  ]
})
export class SharedModule { }
