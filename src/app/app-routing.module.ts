import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EsqueciSenhaComponent } from './recuperar-senha/esqueci-senha/esqueci-senha.component';
import { AuthGuard } from './services/configs/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { PainelAdminComponent } from './sistema/Dashboard-Usuarios/painel-admin/painel-admin.component';
import { PainelColaboradorComponent } from './sistema/Dashboard-Usuarios/painel-colaborador/painel-colaborador.component';
import { PainelGerenteComponent } from './sistema/Dashboard-Usuarios/painel-gerente/painel-gerente.component';
import { PainelRhComponent } from './sistema/Dashboard-Usuarios/painel-rh/painel-rh.component';
import { ResetPasswordComponent } from './recuperar-senha/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'esqueci-minha-senha', component: EsqueciSenhaComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard-admin',
        component: PainelAdminComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'dashboard-colaborador',
        component: PainelColaboradorComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_COLABORADOR', 'ROLE_VENDEDOR'] }
      },
      {
        path: 'dashboard-gerente',
        component: PainelGerenteComponent,
        canActivate: [AuthGuard],
        data: { roles: ['GERENTE_GERAL', 'ROLE_GERENTE', 'SUPERVISOR'] }
      },
      {
        path: 'dashboard-rh',
        component: PainelRhComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_RH'] }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
