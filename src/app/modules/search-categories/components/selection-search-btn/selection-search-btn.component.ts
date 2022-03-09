import {Component, Input} from '@angular/core';
import {SelectionType} from "../../../../api/models/selection-type";

@Component({
  selector: 'app-selection-search-btn',
  templateUrl: './selection-search-btn.component.html',
  styleUrls: ['./selection-search-btn.component.scss']
})
/* Design leaf component*/
export class SelectionSearchBtnComponent {

  SelectionType = SelectionType;
  @Input() type: SelectionType = SelectionType.CATEGORIE;
  @Input() isSelected = false;

}
