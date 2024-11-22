import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Product } from '../../@entities/product';
import { DummyDataService } from '../../@services/dummy-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  public productList: Product[] = [];
  public productSelected: Product[] = [];
  public subTotal: number = 0;
  public tax: number = 0;
  public discount: number = 0;
  public totalAmount: number = 0;
  public categoryActive: string = 'all menu';
  public search: string = '';
  public isShowClearAllModal: boolean = false;

  constructor(public dummySvc: DummyDataService) {}

  async ngOnInit(): Promise<void> {
    this.productList = this.dummySvc.productList;
  }

  public increaseAmount(product: Product) {
    const productIndex = this.productList.findIndex(
      (prod) => prod.id === product.id,
    );
    this.productList[productIndex].amount += 1;

    const productSelectedIndex = this.productSelected.findIndex(
      (prod) => prod.id === product.id,
    );

    if (productSelectedIndex === -1) {
      this.productSelected.push(this.productList[productIndex]);
    } else {
      this.productSelected[productSelectedIndex].amount = product.amount;
    }

    this.countSummary();
  }

  public decreaseAmount(product: Product) {
    const productIndex = this.productList.findIndex(
      (prod) => prod.id === product.id,
    );

    const productSelectedIndex = this.productSelected.findIndex(
      (prod) => prod.id === product.id,
    );

    if (this.productList[productIndex].amount <= 1) {
      this.productList[productIndex].amount = 0;

      if (productSelectedIndex >= 0) {
        this.productSelected = this.productSelected.filter(
          (val) => val.id !== product.id,
        );
      }
    } else {
      this.productList[productIndex].amount -= 1;

      this.productSelected[productSelectedIndex].amount = product.amount;
    }

    this.countSummary();
  }

  public countSummary() {
    let subTotalTmp: number[] = [];

    this.productSelected.map((product) =>
      subTotalTmp.push(product.amount * product.price),
    );

    this.subTotal = subTotalTmp.reduce((sum, item) => sum + item, 0);

    this.tax = (this.subTotal / 100) * 10;

    this.totalAmount = this.subTotal + this.tax - this.discount;
  }

  public formatPrice(price: number): string {
    const newPrice = new Intl.NumberFormat().format(price);
    return `Rp. ${newPrice}`;
  }

  public clearAll() {
    this.productSelected.map((product) => {
      const productIndex = this.productList.findIndex(
        (prod) => prod.id === product.id,
      );
      this.productList[productIndex].amount = 0;
    });

    this.productSelected = [];
    this.subTotal = 0;
    this.tax = 0;
    this.discount = 0;
    this.totalAmount = 0;
    this.isShowClearAllModal = false;
  }

  public selectCategory(category: string) {
    this.categoryActive = category;
    this.search = '';

    if (category === 'all menu') {
      this.productList = this.dummySvc.productList;
    } else {
      this.productList = this.dummySvc.productList.filter(
        (product) => product.category === category,
      );
    }
  }

  public searchCategory() {
    if (this.search) {
      this.categoryActive = '';
      this.productList = this.dummySvc.productList.filter((product) =>
        product.name.toLowerCase().match(this.search),
      );
    } else {
      this.selectCategory('all menu');
    }
  }

  public setShowClearAllModal() {
    if (this.productSelected.length > 0) {
      this.isShowClearAllModal = !this.isShowClearAllModal;
    }
  }
}
