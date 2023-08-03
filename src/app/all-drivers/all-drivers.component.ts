import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DataCollectorService } from '../data-collector.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-drivers',
  templateUrl: './all-drivers.component.html',
  styleUrls: ['./all-drivers.component.css']
})
export class AllDriversComponent implements OnInit {

  public loading: any;
  public allDrivers: Array<any> = [];
  public deleteIndex: any;

  constructor(public service: DataCollectorService,
    public router: Router) {
    this.getAllDrivers();
  }

  ngOnInit() {
  }

  getAllDrivers() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child('Drivers')
      .once('value', function (snapshot) {
        var drivers = snapshot.val();
        for (var key in drivers) {
          var driver = drivers[key];
          driver.key = key;
          self.allDrivers.push(driver);
        }
        self.loading = false;
      });
  }


  editDriver(index) {
    this.service.editDrivers = true;
    this.service.driverObject = this.allDrivers[index];
    this.router.navigate(['/add-driver']);
  }

  deleteDriver(index) {
    this.deleteIndex = index;
  }

  confirmDelete() {
    var self = this;
    var updates = {};
    updates['/Drivers/' + self.allDrivers[this.deleteIndex].key] = null;
    firebase.database().ref().update(updates).then(() => {
      self.allDrivers.splice(self.deleteIndex, 1);
    });
  }

}
