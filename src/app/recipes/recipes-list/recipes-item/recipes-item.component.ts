import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../recipes.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  //2.now because we don't have recipeEl any more in our recipe.item.html comp, so add/create own Custom Property recipe (of type Recipe model class) with @Input(), so be accessibla/bindiable from outside(from parent, from recipe-list comp)
  @Input() recipe:Recipe;
  //2(163)//create id property here in this comp with @Input, and bind this child property in the recipes-list component(parent)
  @Input() id:number;
  // @Output('selectedRecipe') selectedRecipe = new EventEmitter<{name:string, description: string, imagePath: string}>();
  //2.create/add my own Custom event recipeselected, that I will emit in onSelected() method
  //@Output() recipeSelected = new EventEmitter<void>(); //EventEmitter here won't pass any informations, so type is void (return nothing)(don;t contain any informations)
  //2'' lets inject Recipe service in the constructor()
  // constructor(private recipesService:RecipesService,
  //   private router:Router,
  //   private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  // onSelected() {
  //   this.router.navigate([':id'], {relativeTo:this.route});
//1''here I want to call some method(property) of my service which will transform that data for me
//3''emit my own event(from recipeService) here in OnSelected.//emit this.recipe in this selected recipe-item component(that is the data that we want to pass/emit)
  //this.recipesService.recipeSelected.emit(this.recipe); //emit the Recipe(that is the data that we want to pass/emit)
//console.log(event.target);
    //console.log(this.selectedRecipe.emit({name:event.name, description:event.description, imagePath:event.imagePath}));
   //3.in this method I want to emit my own Custom event
    //this.recipeSelected.emit(); //we dont't pass anything in emit() (but we could pass Recipe, but we dont do that, because what is parent comp listen?)
  // }
}
