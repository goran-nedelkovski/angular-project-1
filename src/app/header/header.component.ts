import { Component, OnDestroy, OnInit } from '@angular/core';
//import { Subscription } from 'rxjs';
//import { Recipe } from '../recipes/recipes.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //3.create own event featureSelected
  //with @Output decorator, this our own event will be listenable from outside(from our parent component, app comp)
  // @Output() featureSelected = new EventEmitter<string>()

  constructor(private dataStorageService:DataStorageService) { }

  ngOnInit(): void {
    // this.recipesSub = this.dataStorageService.fetchRecipes().subscribe(
    //   (recipes:Recipe[]) => {
    //     console.log(recipes);
    //   }
    // );
  }
//2.define that method, we expect to receaive as parameter some feature:string
  // onSelect(feature:string) {
  //   this.featureSelected.emit(feature) //4.emit our feature:string that we received as parameter value 'recipe' string in our methods call in the template 
  // }
  // onSelect('shopping-list') {

  // }
//8(281)add this method in the header.comp.ts and call here storeRecipes() from DataStprage Service (inject this service in the constricotr and import at the top)
  onSaveData() {
    this.dataStorageService.storeRecipes();
  //8(281)that's all, and we can see in the console the response(our stored resipes[]) and in the firebase we can see a new node resipes (folder), which contains our data (our stored recipes).
  //8(281).if we used post request (for one single Recipe is used post() btw), then in the db we need to have an encripted key (id) for that Recipe (encriped kes for all Recipes objects/pieces), but with put() method, firebase assume that I know what I put there in the db(so, we dont need encripted keys(id) with put() method //only for post() we need that id(encripted keys))
  }
//3.(282)//add this onFecthData() on header.comp. ts and there we can accces to that method fetchRecipes() trough the injected DataStorage Service 
  onFetchData() {
    this.dataStorageService.fetchRecipes();
    
  }

  // ngOnDestroy() {
  //   this.recipesSub.unsubscribe();
  // }

}
