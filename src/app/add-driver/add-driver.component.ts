import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DataCollectorService } from '../data-collector.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {

  public fullName: any;
  public contact: any;
  public email: any;
  public gender: any = "male";
  public loading: any;
  public address: any;
  public errorTxt: any = "Invalid Fields";

  public editDrivers: any;
  public driverObject: any;

  constructor(public service: DataCollectorService) {

    this.editDrivers = service.editDrivers;
    if (this.editDrivers) {
      this.service.editCleaner = false;
      this.driverObject = service.driverObject;
      debugger;
      this.mapEditDriverData();
    }
  }

  ngOnInit() {
  }

  saveDriver() {

    var self = this;
    if (!self.validate()) {
      alert(this.errorTxt);
      return;
    }

    self.loading = true;
    var postData = {
      name: this.fullName || " ",
      contact: this.contact || " ",
      email: this.email || " ",
      gender: this.gender || " ",
      address: this.address || "",
      timestamp: Number(new Date())
    };

    var newPostKey = firebase.database().ref().child('Drivers').push().key;
    var updates = {};
    updates['/Drivers/' + newPostKey] = postData;
    firebase.database().ref().update(updates).then(function () {
      self.loading = false;
      alert("Driver Saved!!");
    });
  }

  mapEditDriverData() {
    this.fullName = this.driverObject.name;
    this.contact = this.driverObject.contact;
    this.email = this.driverObject.email;
    this.gender = this.driverObject.gender;
    this.address = this.driverObject.address;
  }

  editDriver() {

    var self = this;
    if (!self.validate()) {
      alert(this.errorTxt);
      return;
    }

    self.loading = true;
    var updates = {};
    updates['/Drivers/' + self.driverObject.key + "/name"] = self.fullName;
    updates['/Drivers/' + self.driverObject.key + "/contact"] = self.contact;
    updates['/Drivers/' + self.driverObject.key + "/gender"] = self.gender;
    updates['/Drivers/' + self.driverObject.key + "/address"] = self.address;
    updates['/Drivers/' + self.driverObject.key + "/email"] = self.email;

    firebase.database().ref().update(updates).then(() => {
      self.loading = false;
      alert("Driver Edited!!");
    });

  }


  validate() {
    if (!this.fullName) {
      return false;
    } else if (!this.contact) {
      return false;
    } else if (!this.gender) {
      return false;
    } else if (!this.address) {
      return false;
    } else if (!this.email.includes("@") || !this.email.includes(".")) {
      this.errorTxt = "Email Badly Formated";
      return false;
    } else if (this.contact.length != 8) {
      this.errorTxt = "Invalid Phone Number";
      return false;
    }
    return true;
  }

  /*  validate() {
     if (!this.fullName) {
       return false;
     } else if (!this.contact) {
       return false;
     } else if (!this.gender) {
       return false;
     } else if (!this.address) {
       return false;
     } else if (!this.password) {
       return false;
     } else if (this.password.length < 6) {
       return false;
     } else if (!this.email) {
       return false;
     } else if (!this.email.includes("@") || !this.email.includes(".")) {
       this.errorTxt = "Email Badly Formated";
       return false;
     } else if (this.contact.length != 8) {
       this.errorTxt = "Invalid Phone Number";
       return false;
     }
     return true;
   } */


}
