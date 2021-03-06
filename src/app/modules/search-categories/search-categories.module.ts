import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchCategoriesRoutingModule} from './search-categories-routing.module';
import {SearchPageComponent} from './pages/search-page/search-page.component';
import {SelectionSearchBtnComponent} from './components/selection-search-btn/selection-search-btn.component';
import {CategoryComponent} from './components/category/category.component';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {DatatableCategoryComponent} from "./components/datatable-category/datatable-category.component";
import {EtiquetteComponent} from "./components/etiquette/etiquette.component";


@NgModule({
  declarations: [
    SearchPageComponent,
    SelectionSearchBtnComponent,
    EtiquetteComponent,
    CategoryComponent,
    DatatableCategoryComponent
  ],
  imports: [
    CommonModule,
    SearchCategoriesRoutingModule,
    BsDropdownModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class SearchCategoriesModule {
}
