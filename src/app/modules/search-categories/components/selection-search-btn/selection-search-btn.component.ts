import {Component, Input, OnInit} from '@angular/core';
import {SelectionType} from "../../../../api/models/selection-type";

@Component({
  selector: 'app-selection-search-btn',
  templateUrl: './selection-search-btn.component.html',
  styleUrls: ['./selection-search-btn.component.scss']
})
export class SelectionSearchBtnComponent implements OnInit {

  SelectionType = SelectionType;
  @Input() type: SelectionType = SelectionType.CATEGORIE;
  @Input() isSelected = false;

  constructor() { }

  ngOnInit(): void {
  }

}
