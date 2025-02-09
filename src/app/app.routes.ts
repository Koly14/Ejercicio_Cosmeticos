import { Routes } from '@angular/router';
import {CosmeticListComponent} from "./components/cosmetic-list/cosmetic-list.component";
import {CosmeticEditComponent} from "./components/cosmetic-edit/cosmetic-edit.component";
import {InicioComponent} from "./components/inicio/inicio.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "inicio",
    pathMatch: "full",
  },
  {
    path: "inicio",
    component: InicioComponent,
  },
  {
    path: "cosmetic/list",
    component: CosmeticListComponent
  },
  {
    // Para editar con una ID que te pide (Usan mismo componente y distinta URL)
    path: "cosmetic/edit/:id",
    component: CosmeticEditComponent
  },
  {
    // Para añadir (Usan mismo componente y distinta URL)
    path: "cosmetic/add",
    component: CosmeticEditComponent
  },
  {
    path: "**",
    redirectTo: "cosmetic/list",
    pathMatch: "full",
  }
];
