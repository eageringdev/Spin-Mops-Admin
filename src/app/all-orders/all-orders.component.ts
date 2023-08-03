import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { DataCollectorService } from '../data-collector.service';



@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  public loading: any;
  public pendingOrders: Array<any> = [];
  public completedOrders: Array<any> = [];
  public cancelledOrders: Array<any> = [];
  public approvedOrders: Array<any> = [];

  public pendingOrdersCount: any = 0;
  public completedOrdersCount: any = 0;
  public cancelledOrdersCount: any = 0;
  public approvedOrdersCount: any = 0;


  constructor(public router: Router,
    public service: DataCollectorService) {
    this.pendingOrders = [];
    this.completedOrders = [];
    this.cancelledOrders = [];
    this.approvedOrders = [];

    this.getAllOrders();
  }

  ngOnInit() {

  }

  getAllOrders() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child('Orders')
      .once('value', function (snapshot) {
        var Orders = snapshot.val();
        for (var key in Orders) {
          var Order = Orders[key];
          Order.key = key;
          Order.orderPlacedFormatedDate = moment(Order.timestamp).format("dddd, MMMM Do YYYY, h:mm a");
          if (Order.orderStatus == "Pending") {
            self.pendingOrders.push(Order);
          } else if (Order.orderStatus == "Completed") {
            self.completedOrders.push(Order);
          } else if (Order.orderStatus == "Cancelled") {
            self.cancelledOrders.push(Order);
          } else if (Order.orderStatus == "Approved") {
            self.approvedOrders.push(Order);
          }
        }

        self.pendingOrdersCount = self.pendingOrders.length;
        self.completedOrdersCount = self.completedOrders.length;
        self.cancelledOrdersCount = self.cancelledOrders.length;
        self.approvedOrdersCount = self.approvedOrders.length;
        self.loading = false;
      });
  }

  orderDetailsPending(index) {
    this.service.orderObject = this.pendingOrders[index];
    this.router.navigate(['/order-detail']);
  }

  orderDetailsApproved(index) {
    this.service.orderObject = this.approvedOrders[index];
    this.router.navigate(['/order-detail']);
  }

  orderDetailsCompleted(index) {
    this.service.orderObject = this.completedOrders[index];
    this.router.navigate(['/order-detail']);
  }

  orderDetailsCancelled(index) {
    this.service.orderObject = this.cancelledOrders[index];
    this.router.navigate(['/order-detail']);
  }
}
