import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';
import { AdminComponent } from './Home/admin/admin.component';
import { GerenteComponent } from './Home/gerente/gerente.component';
import { FuncionarioComponent } from './Home/funcionario/funcionario.component';
import { LojasComponent } from './Administrativo/lojas/lojas.component';
import { GerentesComponent } from './Administrativo/gerentes/gerentes.component';
import { FuncionariosComponent } from './Administrativo/funcionarios/funcionarios.component';
import { CursosComponent } from './Servicos/cursos/cursos.component';
import { ForumNoticiasComponent } from './Servicos/forum-noticias/forum-noticias.component';
import { FaleComODonoComponent } from './Servicos/fale-com-o-dono/fale-com-o-dono.component';
import { LojinhaComponent } from './Servicos/lojinha/lojinha.component';


@NgModule({
  declarations: [
    AdminComponent,
    GerenteComponent,
    FuncionarioComponent,
    LojasComponent,
    GerentesComponent,
    FuncionariosComponent,
    CursosComponent,
    ForumNoticiasComponent,
    FaleComODonoComponent,
    LojinhaComponent
  ],
  imports: [
    CommonModule,
    SistemaRoutingModule
  ]
})
export class SistemaModule { }
