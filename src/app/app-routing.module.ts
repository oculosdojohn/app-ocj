import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { PainelAdminComponent } from './sistema/Dashboard-Usuarios/painel-admin/painel-admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './services/configs/auth.guard';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'esqueci-minha-senha', component: EsqueciSenhaComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],         
    children: [
      { path: 'usuario/dashboard-admin', component: PainelAdminComponent },
      { path: '', redirectTo: 'usuario/dashboard-admin', pathMatch: 'full' },
    ]
  },
  { path: 'forbidden', component: ForbiddenComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }