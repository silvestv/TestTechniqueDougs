import {Component, Input} from '@angular/core';
import {Categorie} from "../../../../api/models/categorie";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
/* Design leaf component*/
export class CategoryComponent {

  @Input() isAlphaOrder = true;
  @Input() category: Categorie | undefined;

}
