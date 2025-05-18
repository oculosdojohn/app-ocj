import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { AuthGuard } from './services/configs/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { PainelAdminComponent } from './sistema/Dashboard-Usuarios/painel-admin/painel-admin.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'esqueci-minha-senha', component: EsqueciSenhaComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],         
    children: [
      { path: 'dashboard-admin', component: PainelAdminComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_RH'] } }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
