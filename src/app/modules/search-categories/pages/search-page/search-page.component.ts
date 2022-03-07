import { Component, OnInit } from '@angular/core';
import {CategoriesDataService} from "../../services/categories-data.service";
import {Categorie} from "../../../../api/models/categorie";
import {SelectionType} from "../../../../api/models/selection-type";
import {GroupCategorie} from "../../../../api/models/group-categorie";
import {FormControl} from "@angular/forms";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

export const SPECIAL_CLASS_CONSTRUCTION = "Construction ou acquisition de bâtiment";
export const CHOOSE_CATEGORY = "Tous les groupes de catégories";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  specialConstruction = SPECIAL_CLASS_CONSTRUCTION;

  categories: Categorie[] = [];

  SelectionType = SelectionType;

  isAlphaOrder = false;

  groupsOfCategory: GroupCategorie[] = [];

  labelDropDown = CHOOSE_CATEGORY;
  originalLabelDropDown = CHOOSE_CATEGORY;

  searchByCategorie = new FormControl('');

  selectedCategory: Categorie | undefined;

  constructor(private categoriesDataService: CategoriesDataService) { }

  faSearch = faSearch;
  ngOnInit(): void {

    this.categoriesDataService.categoriesFiltered$
      .subscribe(
        (categories: Categorie[]) => {
          this.categories = [...categories]
          if(!this.isAlphaOrder) {
            this.initGroupsOfCategory();
          }
        }
      );

    this.searchByCategorie.valueChanges.subscribe((value: string) => {
      this.categoriesDataService.emitSearchCategoryFilter(value);
    });
  }

  filterByAlphaOrCategorie(isAlpha: boolean): void {
    this.isAlphaOrder = isAlpha;
    this.categoriesDataService.emitIsAlphaOrder(isAlpha);
  }

  filterGroupsCategory(groupCategoryId: number | undefined, newLabel: string) {
    this.labelDropDown = newLabel;
    this.categoriesDataService.emitGroupCategoryFilter(groupCategoryId)
  }

  initGroupsOfCategory(): void {
    this.categories.forEach((categorie) => {
      if(categorie.group) {
        if(!this.groupsOfCategory.find((grpCat => grpCat.id === categorie.group?.id))) {
          this.groupsOfCategory.push(categorie.group)
        }
      }
    });
  }

  // Le prédicat est le suivant : CategorieDataService à
  // au préalable triées les categories par grouoe de category
  // la découpe evite de créer un nouveau tableau
  generatedCategoryByGroups(grpOfCategory: GroupCategorie): Categorie[] {
    let indexDebut = -1;
    let indexFin = -1;
    for(const [index, categorie] of this.categories.entries()) {
      if(categorie.group?.id === grpOfCategory.id && indexDebut === -1) {
        indexDebut = index;
      } else if(indexDebut !== -1 && indexFin === -1 && categorie.group?.id !== grpOfCategory.id) {
        indexFin = index;
        break;
      }
      if( indexDebut !== -1 && index === this.categories.length - 1 ) {
        indexFin = index + 1;
      }
    }
    if(indexDebut !== -1 && indexFin !== -1) {
      return this.categories.slice(indexDebut, indexFin);
    } else {
      return [];
    }
  }

  endOfDemonstration() {
    alert('Vous avez sélectionnés la catégorie suivante : '+this.selectedCategory?.wording)
  }

}
