import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../models/product.model';
import { ShoppingListService } from '../service/shopping-list.service';
import { ConfirmationService } from 'primeng/api';
import { DocumentData } from '@firebase/firestore';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  providers: [ConfirmationService],
})
export class ShoppingListComponent implements OnInit {
  products: Array<Product> = [];
  shoppingCartProducts: Array<Product> = [];
  hotProducts: Array<Product> = [
    { item: 'brood', quantity: 1 },
    { item: 'beleg', quantity: 1 },
    { item: 'fruit', quantity: 1 },
  ];

  constructor(
    private shoppingListService: ShoppingListService,
    private confirmationService: ConfirmationService
  ) {}

  public ngOnInit(): void {
    this.shoppingListService
      .getProducts()
      .subscribe((products: Array<DocumentData>) => {
        this.products = products as Array<Product>;
      });
  }

  public onSubmit(form: NgForm): void {
    if (form.invalid) return;
    if (
      this.products.find((product: Product) => product.item === form.value.item)
    ) {
      const index: number = this.products.findIndex(
        (product: Product) => product.item === form.value.item
      );
      this._onQuantityPlus(this.products[index]);
    } else {
      const newProduct: Product = {
        item: form.value.item,
        quantity: 1,
      };
      this.shoppingListService.addNewProduct(newProduct);
    }
    form.resetForm();
  }

  public onSetShoppingCart(product: Product): void {
    const filteredProducts: Array<Product> = this.products.filter(
      (prod: Product) => prod.item === product.item
    );
    this.shoppingCartProducts.push(filteredProducts[0]);
    this.products = this.products.filter(
      (prod: Product) => prod.item !== product.item
    );
  }

  public confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.shoppingCartProducts.forEach((product: Product) => {
          this.shoppingListService.deleteProduct(product);
        });
        this.shoppingCartProducts = [];
      },
    });
  }

  public onChangeQuantity(product: Product, type: string): void {
    if (type === 'min') {
      product.quantity < 2
        ? product.quantity === 1
        : this._onQuantityMin(product);
    } else {
      this._onQuantityPlus(product);
    }
  }

  private _onQuantityMin(product: Product): void {
    product.quantity--;
    this.shoppingListService.updateProduct(product);
  }

  private _onQuantityPlus(product: Product): void {
    product.quantity++;
    this.shoppingListService.updateProduct(product);
  }

  public onHotKey(): void {
    this.hotProducts.forEach((product: Product) => {
      if (this.products.find((prod: Product) => prod.item === product.item)) {
        const index: number = this.products.findIndex(
          (prod: Product) => prod.item === product.item
        );
        this._onQuantityPlus(this.products[index]);
      } else {
        this.shoppingListService.addNewProduct(product);
      }
    });
  }
}
