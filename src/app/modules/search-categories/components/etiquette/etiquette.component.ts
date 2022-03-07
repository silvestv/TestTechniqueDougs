import {Component, Input, OnInit} from '@angular/core';
import {GroupCategorie} from "../../../../api/models/group-categorie";

@Component({
  selector: 'app-etiquette',
  templateUrl: './etiquette.component.html',
  styleUrls: ['./etiquette.component.scss']
})
export class EtiquetteComponent implements OnInit {

  @Input() groupCategorie: GroupCategorie | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
