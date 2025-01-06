import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { AdminComponent } from './Home/admin/admin.component';

const routes: Routes = [
  { path: 'usuario', 
    component: LayoutComponent,  
    children: [
      { path: 'dashboard-admin', component: AdminComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }
