import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentData } from 'firebase/firestore';
import { Money } from '../models/money-item.model';
import { MoneyService } from '../service/money.service';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss'],
})
export class MoneyComponent implements OnInit {
  moneyItems: Array<Money> = [];
  constructor(private moneyService: MoneyService) {}

  public ngOnInit(): void {
    this.moneyService
      .getMoney()
      .subscribe((moneyItems: Array<DocumentData>) => {
        this.moneyItems = moneyItems as Array<Money>;
      });
  }

  public onSubmit(form: NgForm): void {
    if (form.invalid) return;
    const newMoney: Money = {
      ...form.value,
      id: this.generateId(),
      date: Date.now(),
    };
    this.moneyService.addNewMoney(newMoney);
    form.resetForm();
  }

  public generateId(): string {
    return Math.random().toString(36).slice(2);
  }

  public getDate(date: Date): string {
    var current_date = new Date(date);
    var formatted_date = `${current_date.getDate()}/${
      current_date.getMonth() + 1
    }/${current_date.getFullYear().toString().substring(2)}`;
    return formatted_date;
  }

  public deleteMoney(money: Money): void {
    this.moneyService.deleteMoney(money);
  }

  public getTotalCost() {
    return this.moneyItems.reduce((total, currentValue) => {
      return total + Number(currentValue.quantity);
    }, 0);
  }
}
