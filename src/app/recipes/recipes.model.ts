import { Ingredient } from "../shared/ingredient.model";

//blue-print class (vanilla ts class) for how the singe recipe should look like and from this brue-print class we would create real object(instances of this class)
export class Recipe {
    public name: string;  //public accessor - to can access to these properties from outside
    public description: string;
    public imagePath: string;
//1''''first I will work on my recipes MOdel, I will add publick property ingredients:Ingredient[].make sure to import Ingredient model(now go to recipes.service.ts)
    public ingredients: Ingredient[];
//we need a constructor to create a new objects(instances) with new keyword and passing some arguments in the Construcor (arg1, arg2, ...)
    constructor(name:string, desc:string, imagePath:string, ingredients:Ingredient[]) {
//constructor() is build-in function that every class contains, and it will be executed once (and called once) when we create a new obj/instance of that class
    //here we need to asign the arguments/parameters thatg we receives to the properties of the this current obj(of the class)
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    }
}
//this Recipe model file will be inside on the recipe folder
//1''''first I will work on my recipes MOdel