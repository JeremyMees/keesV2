import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor(private firestore: AngularFirestore) {}

  public addNewProduct(product: Product): void {
    this.firestore.collection('food').add(product);
  }

  public getProducts(): Observable<Array<DocumentData>> {
    return this.firestore
      .collection('food', (ref) => ref.orderBy('item', 'asc'))
      .valueChanges() as Observable<Array<DocumentData>>;
  }

  public deleteProduct(product: Product): void {
    this.firestore
      .collection('food', (ref) => ref.where('item', '==', product.item))
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.firestore.collection('food').doc(`${doc.id}`).delete();
        });
      });
  }

  public updateProduct(product: Product): void {
    this.firestore
      .collection('food', (ref) => ref.where('item', '==', product.item))
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.firestore.collection('food').doc(`${doc.id}`).update(product);
        });
      });
  }
}
