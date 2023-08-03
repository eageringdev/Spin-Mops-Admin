import { Component, OnInit } from '@angular/core';
import { DataCollectorService } from '../data-collector.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  public orderObject: any;
  public loading: any;
  public allCleaners: Array<any> = [];
  public assignedCleaners: Array<any> = [];
  public adminNotes: any;
  public iseditCleaners: any = false;

  constructor(public service: DataCollectorService,
    public router: Router) {
    this.orderObject = this.service.orderObject;
    this.getAllCleaners();
  }

  ngOnInit() {
  }

  getAllCleaners() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child('Cleaners')
      .once('value', function (snapshot) {
        var cleaners = snapshot.val();
        for (var key in cleaners) {
          var cleaner = cleaners[key];
          cleaner.key = key;
          if (self.orderObject.assignedCleaners) {
            for (var a = 0; a < self.orderObject.assignedCleaners.length; a++) {
              if (cleaner.uid == self.orderObject.assignedCleaners[a].uid) {
                cleaner.isSelected = true;
                break;
              } else {
                cleaner.isSelected = false;
              }
            }
          } else {
            cleaner.isSelected = false;
          }
          self.allCleaners.push(cleaner);
        }
        self.loading = false;
        /*  self.checkAlreadyAssignedCleaners(); */
      });
  }

  checkValue(event: any) {
    debugger;
    console.log(event);
  }

  approveOrder() {
    debugger;
    this.getSelectedCleaners();
    if (this.assignedCleaners.length > 0) {
      debugger;
      this.UpdateStatusOrder();
    } else {
      alert("Please Assign a Cleaner");
    }
  }

  getSelectedCleaners() {
    for (var a = 0; a < this.allCleaners.length; a++) {
      if (this.allCleaners[a].isSelected) {
        var cleaner: any = {};
        cleaner.name = this.allCleaners[a].name;
        cleaner.uid = this.allCleaners[a].uid;
        this.assignedCleaners.push(cleaner);
      }
    }
  }

  UpdateStatusOrder() {
    var self = this;
    self.loading = true;
    var updates = {};

    updates['/Orders/' + self.orderObject.key + "/orderStatus"] = "Approved";
    updates['/Orders/' + self.orderObject.key + "/adminNotes"] = self.adminNotes || "";
    updates['/Orders/' + self.orderObject.key + "/assignedCleaners"] = self.assignedCleaners;

    firebase.database().ref().update(updates).then(() => {
      /*   alert("Status Updated!!");
        self.router.navigate(['/all-orders']); */
      self.sendNotification(self.orderObject.userId, "Your Order Number: " + self.orderObject.orderId + " has been Approved by Admin.");
    });
  }

  completeOrder() {
    var self = this;
    self.loading = true;
    var updates = {};

    updates['/Orders/' + self.orderObject.key + "/orderStatus"] = "Completed";
    updates['/Orders/' + self.orderObject.key + "/adminNotes"] = self.adminNotes || "";

    firebase.database().ref().update(updates).then(() => {
      /*  alert("Status Updated!!");
       self.router.navigate(['/all-orders']);*/
      self.sendNotification(self.orderObject.userId, "Your Order Number: " + self.orderObject.orderId + " has been Completed by Admin.");
    });
  }

  cancelOrder() {
    var self = this;
    self.loading = true;
    var updates = {};

    updates['/Orders/' + self.orderObject.key + "/orderStatus"] = "Cancelled";
    updates['/Orders/' + self.orderObject.key + "/adminNotes"] = self.adminNotes || "";

    firebase.database().ref().update(updates).then(() => {
      /* alert("Status Updated!!");
      self.router.navigate(['/all-orders']); */
      self.sendNotification(self.orderObject.userId, "Your Order Number: " + self.orderObject.orderId + " has been Cancelled by Admin.");

    });
  }

  editCleaners() {
    this.iseditCleaners = true;
  }

  updateOrderCleaners() {
    var self = this;
    self.getSelectedCleaners();
    var updates = {};

    updates['/Orders/' + self.orderObject.key + "/assignedCleaners"] = self.assignedCleaners;
    firebase.database().ref().update(updates).then(() => {
      alert("Cleaners Updated!!");
    });
  }

  sendNotification(uid, text) {
    //Getting DeviceToken from User Table..
    var self = this;
    firebase.database().ref().child('Users/' + uid)
      .once('value', function (snapshot) {
        var users = snapshot.val();
        if (users) {
          if (users.deviceTokens) {
            //Sending Notification here...
            var addMessage = firebase.functions().httpsCallable('sendNotification');
            addMessage({
              title: "Order Update",
              data: "",
              message: text,
              deviceToken: users.deviceTokens
            }).then(function (result) {
              self.saveNotificationFirebase(uid, text);
            }, function (error) {
            });
          } else {
            self.loading = false;
            alert("Unable to Send Notification, Status Updated!");
            self.router.navigate(['/all-orders']);
          }
        } else {
          self.loading = false;
          alert("User Not Found");
        }
      });
  }

  saveNotificationFirebase(uid, text) {
    var self = this;
    var data = {
      title: "Order Update",
      message: text,
      user: uid,
      timestamp: Number(new Date()),
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child("Notifications/" + uid).push().key;
    var updates = {};
    updates['/Notifications/' + uid + "/" + newPostKey] = data;
    firebase.database().ref().update(updates).then(() => {
      self.loading = false;
      alert("Status Updated!!");
      self.router.navigate(['/all-orders']);
    });
  }

}
