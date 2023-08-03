import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DataCollectorService } from '../data-collector.service';

@Component({
  selector: 'app-add-cleaning-service',
  templateUrl: './add-cleaning-service.component.html',
  styleUrls: ['./add-cleaning-service.component.css']
})
export class AddCleaningServiceComponent implements OnInit {

  public serviceName: any;
  public serviceTime: any;
  public serviceCost: any;
  public details: any;
  public loading: any;
  public errorTxt: any = "Invalid Fields";

  public editCleaningService: any = false;
  public cleaningServiceObject: any;


  constructor(public service: DataCollectorService) {

    this.editCleaningService = service.editCleaningService;
    if (this.editCleaningService) {
      this.service.editCleaningService = false;
      this.cleaningServiceObject = service.cleaningServiceObject;
      debugger;
      this.mapEditCleaningData();
    }
  }

  ngOnInit() {
  }

  saveService() {
    var self = this;
    if (!self.validate()) {
      alert(this.errorTxt);
      return;
    }

    self.loading = true;
    var postData = {
      name: this.serviceName || " ",
      serviceTime: this.serviceTime || " ",
      serviceCost: this.serviceCost || " ",
      details: this.details || " ",
      timestamp: Number(new Date())
    };

    var newPostKey = firebase.database().ref().child('CleaningService').push().key;
    var updates = {};
    updates['/CleaningService/' + newPostKey] = postData;
    firebase.database().ref().update(updates).then(function () {
      self.loading = false;
      alert("Service Saved!!");
    });
  }

  mapEditCleaningData() {
    this.serviceName = this.cleaningServiceObject.name;
    this.serviceTime = this.cleaningServiceObject.serviceTime;
    this.serviceCost = this.cleaningServiceObject.serviceCost;
    this.details = this.cleaningServiceObject.details;
  }

  editDriver() {
    var self = this;
    if (!self.validate()) {
      alert(this.errorTxt);
      return;
    }

    self.loading = true;
    var updates = {};
    updates['/CleaningService/' + self.cleaningServiceObject.key + "/name"] = self.serviceName;
    updates['/CleaningService/' + self.cleaningServiceObject.key + "/serviceTime"] = self.serviceTime;
    updates['/CleaningService/' + self.cleaningServiceObject.key + "/details"] = self.details;
    updates['/CleaningService/' + self.cleaningServiceObject.key + "/serviceCost"] = self.serviceCost;

    firebase.database().ref().update(updates).then(() => {
      self.loading = false;
      alert("Service Edited!!");
    });
  }


  validate() {
    if (!this.serviceName) {
      return false;
    } else if (!this.serviceTime) {
      return false;
    } else if (!this.details) {
      return false;
    } else if (!this.serviceCost) {
      return false;
    }
    return true;
  }

}
