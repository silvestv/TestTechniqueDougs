import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {GroupCategorie} from "../../../../api/models/group-categorie";

@Component({
  selector: 'app-etiquette',
  templateUrl: './etiquette.component.html',
  styleUrls: ['./etiquette.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/* Design leaf component*/
export class EtiquetteComponent {
  @Input() groupCategorie: GroupCategorie | undefined;
}
