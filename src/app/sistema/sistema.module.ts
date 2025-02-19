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
import { CadastroCursosComponent } from './Servicos/cadastro-cursos/cadastro-cursos.component';
import { CadastroNoticiasComponent } from './Servicos/cadastro-noticias/cadastro-noticias.component';
import { CadastroLojinhaProdutosComponent } from './Servicos/cadastro-lojinha-produtos/cadastro-lojinha-produtos.component';
import { RhComponent } from './Home/rh/rh.component';
import { MedicinaComponent } from './RH/medicina/medicina.component';
import { FeedbaksComponent } from './RH/feedbaks/feedbaks.component';
import { RegistrosComponent } from './RH/registros/registros.component';
import { DepartamentosComponent } from './Administrativo/departamentos/departamentos.component';
import { CadastroDeDepartamentoComponent } from './Administrativo/cadastro-de-departamento/cadastro-de-departamento.component';
import { CadastroDeColaboradorComponent } from './Administrativo/cadastro-de-colaborador/cadastro-de-colaborador.component';
import { CadastroDeGerenteComponent } from './Administrativo/cadastro-de-gerente/cadastro-de-gerente.component';
import { CadastroDeLojaComponent } from './Administrativo/cadastro-de-loja/cadastro-de-loja.component';
import { SharedModule } from '../shared/shared.module';


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
    LojinhaComponent,
    CadastroCursosComponent,
    CadastroNoticiasComponent,
    CadastroLojinhaProdutosComponent,
    RhComponent,
    MedicinaComponent,
    FeedbaksComponent,
    RegistrosComponent,
    DepartamentosComponent,
    CadastroDeDepartamentoComponent,
    CadastroDeColaboradorComponent,
    CadastroDeGerenteComponent,
    CadastroDeLojaComponent
  ],
  imports: [
    CommonModule,
    SistemaRoutingModule,
    SharedModule
  ]
})
export class SistemaModule { }
