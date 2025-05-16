import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout.component';

import { AuthGuard } from '../services/configs/auth.guard'; 

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
import { ModuloCursoComponent } from './Servicos/modulo-curso/modulo-curso.component';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import { BuscarAulasComponent } from './Servicos/buscar-aulas/buscar-aulas.component';
import { DetalhesLojaComponent } from './Administrativo/vizualizar-adm/detalhes-loja/detalhes-loja.component';
import { DetalhesColaboradorComponent } from './Administrativo/vizualizar-adm/detalhes-colaborador/detalhes-colaborador.component';
import { DetalhesDepartamentoComponent } from './Administrativo/vizualizar-adm/detalhes-departamento/detalhes-departamento.component';

const routes: Routes = [
  {
    path: 'usuario',
    component: LayoutComponent,
    canActivate: [AuthGuard],  
    children: [
      // telas de dashboard por perfil
      { path: 'dashboard-admin', component: PainelAdminComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'dashboard-colaborador', component: PainelColaboradorComponent  ,canActivate: [AuthGuard], data: { roles: ['ROLE_COLABORADOR', 'ROLE_VENDEDOR'] } },
      { path: 'dashboard-gerente', component: PainelGerenteComponent ,canActivate: [AuthGuard], data: { roles: ['GERENTE_GERAL', 'ROLE_GERENTE', 'SUPERVISOR'] } },
      { path: 'dashboard-rh', component: PainelRhComponent , canActivate: [AuthGuard], data: { roles: ['ROLE_RH'] } },
      { path: 'meu-perfil', component: MeuPerfilComponent },

      { path: 'colaboradores-das-lojas', component: FuncionariosComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'gerentes-lojas', component: GerentesComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'lojas-john', component: LojasComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'departamentos-da-empresa', component: DepartamentosComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'cadastro-de-colaborador', component: CadastroDeColaboradorComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'cadastro-de-colaborador/:id', component: CadastroDeColaboradorComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'detalhes-colaborador/:id', component: DetalhesColaboradorComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'cadastro-de-lojas', component: CadastroDeLojaComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'cadastro-de-lojas/:id', component: CadastroDeLojaComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'detalhes-loja/:id', component: DetalhesLojaComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'cadastro-de-departamento', component: CadastroDeDepartamentoComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'cadastro-de-departamento/:id', component: CadastroDeDepartamentoComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'detalhes-departamento/:id', component: DetalhesDepartamentoComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      
      { path: 'feedbacks', component: FeedbaksComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'saude-ocupacional', component: MedicinaComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'registros', component: RegistrosComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'ferias', component: FeriasComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'cadastro-de-ferias', component: CadastroFeriasComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'cadastro-de-ferias/:id', component: CadastroFeriasComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'aniversariantes-do-mes', component: AniversariantesComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'aniversariantes-do-mes/:id', component: AniversariantesComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'cadastro-de-feedback', component: CadastroDeFeedbackComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'cadastro-de-feedback/:id', component: CadastroDeFeedbackComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'cadastro-de-registro', component: CadastroDeRegistroComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'cadastro-de-registro/:id', component: CadastroDeRegistroComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'cadastro-de-procedimentos-medicos', component: CadastroDeProcedimentosMedicoComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      { path: 'cadastro-de-procedimentos-medicos/:id', component: CadastroDeProcedimentosMedicoComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } },
      

      // Serviços
      { path: 'cadastro-de-aulas', component: CadastroCursosComponent },
      { path: 'cadastro-de-aulas/:id', component: CadastroCursosComponent },
      { path: 'cadastro-noticia', component: CadastroNoticiasComponent },
      { path: 'cadastro-noticia/:id', component: CadastroNoticiasComponent },
      { path: 'cadastro-lojinha-produtos', component: CadastroLojinhaProdutosComponent },
      { path: 'cadastro-lojinha-produto/:id', component: CadastroLojinhaProdutosComponent },

      // rotas públicas (dentro de /usuario)
      { path: 'forum-de-noticias', component: ForumNoticiasComponent },
      { path: 'fale-com-o-dono', component: FaleComODonoComponent },
      { path: 'cursos-disponiveis', component: CursosComponent },
      { path: 'lojinha-do-john', component: LojinhaComponent },
      { path: 'curso/:modulo', component: ModuloCursoComponent },
      { path: 'buscar-aulas', component: BuscarAulasComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }
