import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { PrincipalComponent } from "./componentes/principal/principal.component";
import { IngresoComponent } from "./componentes/ingreso/ingreso.component";
import { PerfilComponent } from "./componentes/perfil/perfil.component";
import { RegistroComponent } from "./componentes/registro/registro.component";

import { CrearTareaComponent } from './componentes/crear-tarea/crear-tarea.component';



const routes: Routes = [

  {
    path: "",
    redirectTo: "/principal",
    pathMatch: "full"
  },
  {
    path: "principal",
    component: PrincipalComponent
  },
  {
    path: "perfil",
    canActivate: [AuthGuard],
    component: PerfilComponent
  },
  {
    path: "perfil/crear-tarea",
    canActivate: [AuthGuard],
    component: CrearTareaComponent
  },
  {
    path: 'crear-tarea/:taskId',
    component: CrearTareaComponent
  },
  {
    path: "ingreso",
    component: IngresoComponent
  },
  {
    path: "registro",
    component: RegistroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
