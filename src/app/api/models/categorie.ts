/* Ce type est le Dto front-end de l'objet envoyé par l'api rest
* On peut ici facilement intégrer une génération automatique via
* un .yml avec la librairie OpenApi*/
import {GroupCategorie} from "./group-categorie";

export interface Categorie {
  id: number;
  group: GroupCategorie | undefined;
  wording: string;
  description: string;
}
