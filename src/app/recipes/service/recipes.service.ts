import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private firestore: AngularFirestore) {}

  public addNewRecipe(recipe: Recipe): void {
    this.firestore.collection('recipes').add(recipe);
  }

  public getRecipes(): Observable<Array<DocumentData>> {
    return this.firestore.collection('recipes').valueChanges() as Observable<
      Array<DocumentData>
    >;
  }

  public deleteRecipe(recipe: Recipe): void {
    this.firestore
      .collection('recipes', (ref) =>
        ref.where('description', '==', recipe.description)
      )
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.firestore.collection('recipes').doc(`${doc.id}`).delete();
        });
      });
  }

  public updateRecipe(recipe: Recipe): void {
    this.firestore
      .collection('recipes', (ref) =>
        ref.where('description', '==', recipe.description)
      )
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.firestore.collection('recipes').doc(`${doc.id}`).update(recipe);
        });
      });
  }
}
