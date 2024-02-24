import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';


const routes: Routes = [
  {path: 'clientes/novo', component: ClientesFormComponent },
  {path: 'clientes/editar/:id', component: ClientesFormComponent },
  {path: 'clientes/listar', component: ClientesListaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
