import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { PainelAdminComponent } from './sistema/Dashboard-Usuarios/painel-admin/painel-admin.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: LayoutComponent, children: [
    { path : 'usuario/dashboard-admin', component: PainelAdminComponent },
    { path: '', redirectTo: 'usuario/dashboard-admin', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }