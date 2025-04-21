import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { SistemaRoutingModule } from './sistema-routing.module';
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
import { MedicinaComponent } from './RH/medicina/medicina.component';
import { FeedbaksComponent } from './RH/feedbaks/feedbaks.component';
import { RegistrosComponent } from './RH/registros/registros.component';
import { DepartamentosComponent } from './Administrativo/departamentos/departamentos.component';
import { CadastroDeDepartamentoComponent } from './Administrativo/cadastro-de-departamento/cadastro-de-departamento.component';
import { CadastroDeColaboradorComponent } from './Administrativo/cadastro-de-colaborador/cadastro-de-colaborador.component';
import { CadastroDeLojaComponent } from './Administrativo/cadastro-de-loja/cadastro-de-loja.component';
import { AniversariantesComponent } from './RH/aniversariantes/aniversariantes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CadastroDeFeedbackComponent } from './RH/cadastro-de-feedback/cadastro-de-feedback.component';
import { CadastroDeRegistroComponent } from './RH/cadastro-de-registro/cadastro-de-registro.component';
import { FeriasComponent } from './RH/ferias/ferias.component';
import { CadastroFeriasComponent } from './RH/cadastro-ferias/cadastro-ferias.component';
import { CadastroDeProcedimentosMedicoComponent } from './RH/cadastro-de-procedimentos-medico/cadastro-de-procedimentos-medico.component';
import { ModuloCursoComponent } from './Servicos/modulo-curso/modulo-curso.component';
import { PainelAdminComponent } from './Dashboard-Usuarios/painel-admin/painel-admin.component';
import { PainelRhComponent } from './Dashboard-Usuarios/painel-rh/painel-rh.component';
import { PainelGerenteComponent } from './Dashboard-Usuarios/painel-gerente/painel-gerente.component';
import { PainelColaboradorComponent } from './Dashboard-Usuarios/painel-colaborador/painel-colaborador.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import { BuscarAulasComponent } from './Servicos/buscar-aulas/buscar-aulas.component';
import { DetalhesLojaComponent } from './Administrativo/vizualizar-adm/detalhes-loja/detalhes-loja.component';
import { DetalhesDepartamentoComponent } from './Administrativo/vizualizar-adm/detalhes-departamento/detalhes-departamento.component';
import { DetalhesColaboradorComponent } from './Administrativo/vizualizar-adm/detalhes-colaborador/detalhes-colaborador.component';

@NgModule({
  declarations: [
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
    MedicinaComponent,
    FeedbaksComponent,
    RegistrosComponent,
    DepartamentosComponent,
    CadastroDeDepartamentoComponent,
    CadastroDeColaboradorComponent,
    CadastroDeLojaComponent,
    AniversariantesComponent,
    CadastroDeFeedbackComponent,
    CadastroDeRegistroComponent,
    FeriasComponent,
    CadastroFeriasComponent,
    CadastroDeProcedimentosMedicoComponent,
    ModuloCursoComponent,
    PainelAdminComponent,
    PainelRhComponent,
    PainelGerenteComponent,
    PainelColaboradorComponent,
    MeuPerfilComponent,
    BuscarAulasComponent,
    DetalhesLojaComponent,
    DetalhesDepartamentoComponent,
    DetalhesColaboradorComponent
  ],
  imports: [
    CommonModule,
    SistemaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgApexchartsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class SistemaModule { }
