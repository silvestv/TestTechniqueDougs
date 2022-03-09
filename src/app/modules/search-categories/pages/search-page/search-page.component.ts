import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesDataService} from "../../services/categories-data.service";
import {Categorie} from "../../../../api/models/categorie";
import {SelectionType} from "../../../../api/models/selection-type";
import {GroupCategorie} from "../../../../api/models/group-categorie";
import {FormControl} from "@angular/forms";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {CHOOSE_CATEGORY, INIT_SELECTION_CATEGORIY_FLAG} from "../../../../../assets/constantes";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
/* Logical container (Parent) component */
export class SearchPageComponent implements OnInit, OnDestroy {

  searchCategorySubscription = new Subscription();
  categoriesStateSubscription = new Subscription();

  categories: Categorie[] = [];

  SelectionType = SelectionType;

  isAlphaOrder = INIT_SELECTION_CATEGORIY_FLAG;

  groupsOfCategory: GroupCategorie[] = [];

  labelDropDown = CHOOSE_CATEGORY;
  originalLabelDropDown = CHOOSE_CATEGORY;

  searchByCategorie = new FormControl('');

  selectedCategory: Categorie | undefined;
  faSearch = faSearch;

  constructor(private categoriesDataService: CategoriesDataService) {
  }

  ngOnInit(): void {

    /* Subscribe to a combineLatest that imitating a state management of ngrx store*/
    this.categoriesStateSubscription = this.categoriesDataService.categoriesFiltered$
      // we don't pass by async pipe to the child component because we have work to do !
      .subscribe(
        (categories: Categorie[]) => {
          // change the reference of immutable object array for the onPush Detection of child
          this.categories = [...categories]
          if (!this.isAlphaOrder) {
            // Collect all the different groups of categories present in data (no doublon)
            this.initGroupsOfCategory();
          }
        }
      );

    // Form reactive tha dynamicclly change the state of the combineLatest, so, filtred the global data
    this.searchCategorySubscription = this.searchByCategorie.valueChanges.subscribe((value: string) => {
      this.categoriesDataService.emitSearchCategoryFilter(value);
    });
  }

  /* update combineLatest Filter*/
  filterByAlphaOrCategorie(isAlpha: boolean): void {
    this.isAlphaOrder = isAlpha;
    this.categoriesDataService.emitIsAlphaOrder(isAlpha);
  }

  /* update combineLatest Filter*/
  filterGroupsCategory(groupCategoryId: number | undefined, newLabel: string) {
    this.labelDropDown = newLabel;
    this.categoriesDataService.emitGroupCategoryFilter(groupCategoryId)
  }

  initGroupsOfCategory(): void {
    this.categories.forEach((categorie) => {
      if (categorie.group) {
        if (!this.groupsOfCategory.find((grpCat => grpCat.id === categorie.group?.id))) {
          this.groupsOfCategory.push(categorie.group)
        }
      }
    });
  }

  endOfDemonstration() {
    alert('Vous avez sélectionnés la catégorie suivante : ' + this.selectedCategory?.wording)
  }

  ngOnDestroy() {
    this.searchCategorySubscription.unsubscribe();
    this.categoriesStateSubscription.unsubscribe();
  }

}
