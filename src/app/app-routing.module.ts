import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { PainelAdminComponent } from './sistema/Dashboard-Usuarios/painel-admin/painel-admin.component';
import { AuthGuard } from './services/configs/auth.guard';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'esqueci-minha-senha', component: EsqueciSenhaComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
