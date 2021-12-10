import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Money } from '../models/money-item.model';

@Injectable({
  providedIn: 'root',
})
export class MoneyService {
  constructor(private firestore: AngularFirestore) {}

  public addNewMoney(money: Money): void {
    this.firestore.collection('money').add(money);
  }

  public getMoney(): Observable<Array<DocumentData>> {
    return this.firestore.collection('money').valueChanges() as Observable<
      Array<DocumentData>
    >;
  }

  public deleteMoney(money: Money): void {
    this.firestore
      .collection('money', (ref) => ref.where('id', '==', money.id))
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.firestore.collection('money').doc(`${doc.id}`).delete();
        });
      });
  }

  public updateMoney(money: Money): void {
    this.firestore
      .collection('money', (ref) => ref.where('id', '==', money.id))
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.firestore.collection('money').doc(`${doc.id}`).update(money);
        });
      });
  }
}
