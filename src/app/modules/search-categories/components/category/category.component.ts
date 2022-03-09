import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Categorie} from "../../../../api/models/categorie";
import {INIT_SELECTION_CATEGORIY_FLAG} from "../../../../../assets/constantes";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/* Design leaf component*/
export class CategoryComponent {

  @Input() isAlphaOrder = INIT_SELECTION_CATEGORIY_FLAG;
  @Input() category: Categorie | undefined;

}
