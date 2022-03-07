import {GroupCategorie} from "./group-categorie";

export interface Categorie {
  id: number;
  group: GroupCategorie | undefined;
  wording: string;
  description: string;
}
