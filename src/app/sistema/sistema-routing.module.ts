import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { FuncionariosComponent } from './Administrativo/funcionarios/funcionarios.component';
import { GerentesComponent } from './Administrativo/gerentes/gerentes.component';
import { LojasComponent } from './Administrativo/lojas/lojas.component';
import { CadastroCursosComponent } from './Servicos/cadastro-cursos/cadastro-cursos.component';
import { CadastroNoticiasComponent } from './Servicos/cadastro-noticias/cadastro-noticias.component';
import { CadastroLojinhaProdutosComponent } from './Servicos/cadastro-lojinha-produtos/cadastro-lojinha-produtos.component';
import { ForumNoticiasComponent } from './Servicos/forum-noticias/forum-noticias.component';
import { FaleComODonoComponent } from './Servicos/fale-com-o-dono/fale-com-o-dono.component';
import { CursosComponent } from './Servicos/cursos/cursos.component';
import { LojinhaComponent } from './Servicos/lojinha/lojinha.component';
import { DepartamentosComponent } from './Administrativo/departamentos/departamentos.component';
import { CadastroDeColaboradorComponent } from './Administrativo/cadastro-de-colaborador/cadastro-de-colaborador.component';
import { CadastroDeLojaComponent } from './Administrativo/cadastro-de-loja/cadastro-de-loja.component';
import { CadastroDeDepartamentoComponent } from './Administrativo/cadastro-de-departamento/cadastro-de-departamento.component';
import { FeedbaksComponent } from './RH/feedbaks/feedbaks.component';
import { MedicinaComponent } from './RH/medicina/medicina.component';
import { RegistrosComponent } from './RH/registros/registros.component';
import { AniversariantesComponent } from './RH/aniversariantes/aniversariantes.component';
import { CadastroDeFeedbackComponent } from './RH/cadastro-de-feedback/cadastro-de-feedback.component';
import { CadastroDeRegistroComponent } from './RH/cadastro-de-registro/cadastro-de-registro.component';
import { FeriasComponent } from './RH/ferias/ferias.component';
import { CadastroFeriasComponent } from './RH/cadastro-ferias/cadastro-ferias.component';
import { PainelRhComponent } from './Dashboard-Usuarios/painel-rh/painel-rh.component';
import { PainelGerenteComponent } from './Dashboard-Usuarios/painel-gerente/painel-gerente.component';
import { PainelColaboradorComponent } from './Dashboard-Usuarios/painel-colaborador/painel-colaborador.component';
import { PainelAdminComponent } from './Dashboard-Usuarios/painel-admin/painel-admin.component';
import { CadastroDeProcedimentosMedicoComponent } from './RH/cadastro-de-procedimentos-medico/cadastro-de-procedimentos-medico.component';

const routes: Routes = [
  { path: 'usuario', 
    component: LayoutComponent,  
    children: [
      // tela de inicio de acordo com a role de cada usuario
      { path: 'dashboard-admin', component: PainelAdminComponent },
      { path: 'dashboard-colaborador', component: PainelColaboradorComponent },
      { path: 'dashboard-gerente', component: PainelGerenteComponent},
      { path: 'dashboard-rh', component: PainelRhComponent},

      // somente rh e admin pode ver
      { path: 'colaboradores-das-lojas', component: FuncionariosComponent},
      { path: 'gerentes-lojas', component: GerentesComponent},
      { path: 'lojas-john', component: LojasComponent},
      { path: 'departamentos-da-empresa', component: DepartamentosComponent},
      { path: 'cadastro-de-colaborador', component: CadastroDeColaboradorComponent},
      { path: 'cadastro-de-lojas', component: CadastroDeLojaComponent},
      { path: 'cadastro-de-departamento', component: CadastroDeDepartamentoComponent},

      // somente rh e admin pode ver
      { path: 'feedbacks', component: FeedbaksComponent},
      { path: 'medicina', component: MedicinaComponent},
      { path: 'registros', component: RegistrosComponent},
      { path: 'ferias', component: FeriasComponent},
      { path: 'cadastrar-ferias', component: CadastroFeriasComponent},
      { path: 'aniversariantes-do-mes', component: AniversariantesComponent},
      { path: 'cadastro-de-feedback', component: CadastroDeFeedbackComponent},
      { path: 'cadastro-de-registro', component: CadastroDeRegistroComponent},
      { path: 'cadastro-de-procedimentos-medicos', component: CadastroDeProcedimentosMedicoComponent},


      { path: 'cadastro-de-aulas', component: CadastroCursosComponent},
      { path: 'cadastro-noticia', component: CadastroNoticiasComponent},
      { path: 'cadastro-lojinha-produtos', component: CadastroLojinhaProdutosComponent},
      
      // todos pode ver aqui
      { path: 'forum-de-noticias', component: ForumNoticiasComponent},
      { path: 'fale-com-o-dono', component: FaleComODonoComponent},
      { path: 'cursos-disponiveis', component:CursosComponent},
      { path: 'lojinha-do-john', component:LojinhaComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }
