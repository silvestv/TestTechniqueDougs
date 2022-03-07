import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, combineLatest, filter, map, Observable, tap} from "rxjs";
import {Categorie} from "../../../api/models/categorie";
import {VisibleCategorie} from "../../../api/models/visible-categorie";
import {GroupCategorie} from "../../../api/models/group-categorie";

@Injectable({
  providedIn: 'root'
})
export class CategoriesDataService {

  allCategoriesSubject$ = new BehaviorSubject<Categorie[]>([]);
  visibleCategoriesSubject$ = new BehaviorSubject<VisibleCategorie[]>([]);
  isAlphaOrderFilter$ = new BehaviorSubject<boolean>(false);
  groupCategoryFilter$ = new BehaviorSubject<number | undefined>(undefined);
  searchCategoryFilter$ = new BehaviorSubject<string>('');

  categoriesFiltered$ = combineLatest([
    this.allCategoriesSubject$,
    this.visibleCategoriesSubject$,
    this.isAlphaOrderFilter$,
    this.groupCategoryFilter$,
    this.searchCategoryFilter$
  ]).pipe(
      map(([allCategories, visibleCategories, isAlphaOrderFilter, groupCategoryFilter, searchCategoryFilter]) => {
        let categoriesFiltered =
          [...allCategories
          .filter(categorie => visibleCategories
            .findIndex((visibleCat)=> visibleCat.id === categorie.id) !== -1
          )];
        if(isAlphaOrderFilter) {
          console.log("la");
          categoriesFiltered = [...this.sortByAlpha(categoriesFiltered)];
        } else {
          categoriesFiltered = [...this.sortByCategories(categoriesFiltered)];
          console.log("la2")
        }
        if(groupCategoryFilter) {
          console.log("ici");
          categoriesFiltered = categoriesFiltered.filter((category) => category.group?.id === groupCategoryFilter);
        }
        if(searchCategoryFilter && searchCategoryFilter.length > 0) {
          categoriesFiltered = categoriesFiltered.filter((category) => category.wording.toLowerCase().includes(searchCategoryFilter.toLowerCase()));
        }
        return categoriesFiltered;
      })
    )

  private readonly allCategoriesUrl = 'http://localhost:3000/all-categories';
  private readonly visiblesCategoriesUrl = 'http://localhost:3000/visible-categories'

  constructor(private http: HttpClient) {
    this.getAllCategories()
      .subscribe(
        (categories: Categorie[]) => this.allCategoriesSubject$.next(categories)
      );
    this.getVisibleCategories()
      .subscribe(
      (visibleCategories: VisibleCategorie[]) => this.visibleCategoriesSubject$.next(visibleCategories)
    );
  }

  private getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.allCategoriesUrl);
  }

  private getVisibleCategories(): Observable<VisibleCategorie[]> {
    return this.http.get<VisibleCategorie[]>(this.visiblesCategoriesUrl);
  }

  private sortByAlpha(categories: Categorie[]): Categorie[] {
    return categories.sort((a, b) => a.wording.localeCompare(b.wording));
  }

  private sortByCategories(categories: Categorie[]): Categorie[] {
    return categories.sort((a, b) => {
      if(a.group && b.group) {
        return a.group.name.localeCompare(b.group.name);
      } else {
        return -1;
      }
    });
  }

  emitIsAlphaOrder(isAlphaOrder: boolean): void {
    this.isAlphaOrderFilter$.next(isAlphaOrder);
  }

  emitGroupCategoryFilter(groupCategoryId: number | undefined): void {
    this.groupCategoryFilter$.next(groupCategoryId);
  }

  emitSearchCategoryFilter(searchString: string): void {
    this.searchCategoryFilter$.next(searchString);
  }
}
