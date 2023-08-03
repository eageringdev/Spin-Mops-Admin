import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { DataCollectorService } from '../data-collector.service';



@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  public loading: any = false;
  public allProducts: Array<any> = [];
  public filterProducts: any = false;
  public filterCategoryKey: any;
  public productsCount: any = 0;

  constructor(public router: Router,
    public service: DataCollectorService) {

    if (service.filterProducts) {
      service.filterProducts = false;
      this.filterProducts = true;
      this.filterCategoryKey = service.filterCategoryKey;
      debugger;
    }
    this.getAllProducts();
  }

  ngOnInit() {
  }

  getAllProducts() {

    var self = this;
    self.loading = true;
    firebase.database().ref().child('Products')
      .once('value', function (snapshot) {
        var products = snapshot.val();
        for (var key in products) {
          var product = products[key];
          product.key = key;

          if (self.filterProducts) {
            if (product.category == self.filterCategoryKey) {
              self.allProducts.push(product);
            }
          } else {
            self.allProducts.push(product);
          }
        }
        self.productsCount = self.allProducts.length;
        self.loading = false;
      });

  }

  productDetails(index) {
    this.service.productObject = this.allProducts[index];
    this.router.navigate(['/product-detail']);
  }

}
