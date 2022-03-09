import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Categorie} from "../../../../api/models/categorie";
import {GroupCategorie} from "../../../../api/models/group-categorie";
import {INIT_SELECTION_CATEGORIY_FLAG, SPECIAL_CLASS_CONSTRUCTION} from "../../../../../assets/constantes";


@Component({
  selector: 'app-datatable-category',
  templateUrl: './datatable-category.component.html',
  styleUrls: ['./datatable-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

/* Logic leaf component*/
export class DatatableCategoryComponent {

  @Output() selectedCategory$ = new EventEmitter<Categorie | undefined>();


  @Input() isAlphaOrder = INIT_SELECTION_CATEGORIY_FLAG;

  @Input() categories: Categorie[] = [];

  @Input() groupsOfCategory: GroupCategorie[] = [];

  selectedCategory: Categorie | undefined;

  specialConstruction = SPECIAL_CLASS_CONSTRUCTION;


  // Le prédicat est le suivant : CategorieDataService à
  // au préalable triées les categories par grouoe de category
  // la découpe evite de créer un nouveau tableau
  generatedCategoryByGroups(grpOfCategory: GroupCategorie): Categorie[] {
    let indexDebut = -1;
    let indexFin = -1;
    for (const [index, categorie] of this.categories.entries()) {
      if (categorie.group?.id === grpOfCategory.id && indexDebut === -1) {
        indexDebut = index;
      } else if (indexDebut !== -1 && indexFin === -1 && categorie.group?.id !== grpOfCategory.id) {
        indexFin = index;
        break;
      }
      if (indexDebut !== -1 && index === this.categories.length - 1) {
        indexFin = index + 1;
      }
    }
    if (indexDebut !== -1 && indexFin !== -1) {
      return this.categories.slice(indexDebut, indexFin);
    } else {
      return [];
    }
  }

  emitSelectedCategory(selectedCategory: Categorie | undefined): void {
    this.selectedCategory = selectedCategory;
    this.selectedCategory$.emit(this.selectedCategory);
  }

}
