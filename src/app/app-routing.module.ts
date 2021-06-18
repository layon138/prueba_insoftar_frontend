import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageUsuarioComponent } from './usuario/page-usuario/page-usuario.component';

const routes: Routes = [
  { path: 'usuarios', component: PageUsuarioComponent },
  { path: '',   redirectTo: '/usuarios', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
