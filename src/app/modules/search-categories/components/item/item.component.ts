import {Component, Input, OnInit} from '@angular/core';
import {Categorie} from "../../../../api/models/categorie";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() isAlphaOrder = true;
  @Input() category: Categorie | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
