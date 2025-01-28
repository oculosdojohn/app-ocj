import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { AdminComponent } from './Home/admin/admin.component';
import { FuncionariosComponent } from './Administrativo/funcionarios/funcionarios.component';
import { GerentesComponent } from './Administrativo/gerentes/gerentes.component';
import { LojasComponent } from './Administrativo/lojas/lojas.component';
import { FuncionarioComponent } from './Home/funcionario/funcionario.component';
import { GerenteComponent } from './Home/gerente/gerente.component';
import { RhComponent } from './Home/rh/rh.component';
import { CadastroCursosComponent } from './Servicos/cadastro-cursos/cadastro-cursos.component';
import { CadastroNoticiasComponent } from './Servicos/cadastro-noticias/cadastro-noticias.component';
import { CadastroLojinhaProdutosComponent } from './Servicos/cadastro-lojinha-produtos/cadastro-lojinha-produtos.component';
import { ForumNoticiasComponent } from './Servicos/forum-noticias/forum-noticias.component';
import { FaleComODonoComponent } from './Servicos/fale-com-o-dono/fale-com-o-dono.component';
import { CursosComponent } from './Servicos/cursos/cursos.component';
import { LojinhaComponent } from './Servicos/lojinha/lojinha.component';
import { DepartamentosComponent } from './Administrativo/departamentos/departamentos.component';
import { CadastroDeGerenteComponent } from './Administrativo/cadastro-de-gerente/cadastro-de-gerente.component';
import { CadastroDeColaboradorComponent } from './Administrativo/cadastro-de-colaborador/cadastro-de-colaborador.component';
import { CadastroDeLojaComponent } from './Administrativo/cadastro-de-loja/cadastro-de-loja.component';
import { CadastroDeDepartamentoComponent } from './Administrativo/cadastro-de-departamento/cadastro-de-departamento.component';

const routes: Routes = [
  { path: 'usuario', 
    component: LayoutComponent,  
    children: [
      { path: 'dashboard-admin', component: AdminComponent },
      { path: 'dashboard-funcionario', component:FuncionarioComponent },
      { path: 'dashboard-gerente', component: GerenteComponent},
      { path: 'dashboard-rh', component: RhComponent},

      { path: 'colaboradores-das-lojas', component: FuncionariosComponent},
      { path: 'gerentes-lojas', component: GerentesComponent},
      { path: 'lojas-john', component: LojasComponent},
      { path: 'departamentos-da-empresa', component: DepartamentosComponent},
      { path: 'cadastro-de-gerente', component: CadastroDeGerenteComponent},
      { path: 'cadastro-de-colaborador', component: CadastroDeColaboradorComponent},
      { path: 'cadastro-de-lojas', component: CadastroDeLojaComponent},
      { path: 'cadastro-de-departamento', component: CadastroDeDepartamentoComponent},

      { path: 'cadastro-de-aulas', component: CadastroCursosComponent},
      { path: 'cadastro-noticia', component: CadastroNoticiasComponent},
      { path: 'cadastro-lojinha-produtos', component: CadastroLojinhaProdutosComponent},
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
