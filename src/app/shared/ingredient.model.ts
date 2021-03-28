//this will be blue-print class, model class for that how the Ingredient will look like  
export class Ingredient {
    //1st way (default way)
    // public name:string;
    // public amount:number; //how many items of that type should we have
    // constructor(name:string, amount:number) {
    //     this.name = name;
    //     this.amount = amount;
    // }
    
    //or 2nd way (shortcut) is like this (it's the same):
    constructor(public name:string, public amount:number) {} //automaticaly will asign the parameters (that we have received) to the properties (to the newly created properties)
//1.add only public accessor at the begining and that will automaticaly give us the properties as arguments 
//2.and automaticaly will asign the values/parameters (that we have received in the constructors) to the properties (to the newly created properties)
}