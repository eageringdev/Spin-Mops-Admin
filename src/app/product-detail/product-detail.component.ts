import { Component, OnInit } from '@angular/core';
import { DataCollectorService } from '../data-collector.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public productObject: any;
  constructor(public service: DataCollectorService,
    public router: Router) {
    this.productObject = service.productObject;
  }

  ngOnInit() {
  }

  confirmDeleteProduct() {
    var self = this;
    var updates = {};
    updates['/Products/' + self.productObject.key] = null;
    firebase.database().ref().update(updates).then(() => {
      alert("Product Deleted");
      this.router.navigate(['/all-products']);
    });
  }


  editProduct() {
    this.service.editProduct = true;
    this.service.editProductObject = this.productObject;
    this.router.navigate(['/add-product']);
  }

}
