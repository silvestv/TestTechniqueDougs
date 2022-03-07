import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FourOhFourComponent} from "./404/four-oh-four/four-oh-four.component";

const routes: Routes = [
  {
    path: 'search-categories',
    loadChildren: () => import('./modules/search-categories/search-categories.module').then(m => m.SearchCategoriesModule)
  },
  {
    path: '',
    redirectTo: '/search-categories',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: FourOhFourComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
