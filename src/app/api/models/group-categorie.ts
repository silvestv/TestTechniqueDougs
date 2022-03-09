/* Ce type est le Dto front-end de l'objet envoyé par l'api rest
* On peut ici facilement intégrer une génération automatique via
* un .yml avec la librairie OpenApi*/
export interface GroupCategorie {
  id: number;
  name: string;
  color: string;
}
