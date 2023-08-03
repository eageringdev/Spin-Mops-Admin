import { Component, OnInit } from '@angular/core'
import * as firebase from 'firebase'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public productsCount: any = 0
  public ordersCount: any = 0
  public cleanersCount: any = 0
  public driversCount: any = 0

  constructor() {
    this.getProductsCount()
  }

  ngOnInit() {}

  getProductsCount() {
    var self = this
    firebase
      .database()
      .ref()
      .child('Products')
      .once('value', function (snapshot) {
        self.productsCount = snapshot.numChildren()
        self.getOrdersCount()
      })
  }

  getOrdersCount() {
    var self = this
    firebase
      .database()
      .ref()
      .child('Orders')
      .once('value', function (snapshot) {
        self.ordersCount = snapshot.numChildren()
        self.getCleanersCount()
      })
  }

  getCleanersCount() {
    var self = this
    firebase
      .database()
      .ref()
      .child('Cleaners')
      .once('value', function (snapshot) {
        self.cleanersCount = snapshot.numChildren()
        self.getDriversCount()
      })
  }

  getDriversCount() {
    var self = this
    firebase
      .database()
      .ref()
      .child('Cleaners')
      .once('value', function (snapshot) {
        self.driversCount = snapshot.numChildren()
      })
  }
}
