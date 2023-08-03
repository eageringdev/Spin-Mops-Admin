import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { DataCollectorService } from '../data-collector.service';


@Component({
  selector: 'app-all-cleaning-services',
  templateUrl: './all-cleaning-services.component.html',
  styleUrls: ['./all-cleaning-services.component.css']
})
export class AllCleaningServicesComponent implements OnInit {

  public loading: any;
  public allServices: Array<any> = [];
  public deleteIndex: any;

  constructor(public service: DataCollectorService,
    public router: Router) {
    this.getAllCleaningService();
  }

  ngOnInit() {
  }

  getAllCleaningService() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child('CleaningService')
      .once('value', function (snapshot) {
        var cleaningService = snapshot.val();
        for (var key in cleaningService) {
          var service = cleaningService[key];
          service.key = key;
          self.allServices.push(service);
        }
        self.loading = false;
      });
  }

  editService(index) {
    this.service.editCleaningService = true;
    this.service.cleaningServiceObject = this.allServices[index];
    this.router.navigate(['/add-cleaningService']);
  }

  deleteService(index) {
    this.deleteIndex = index;
  }

  confirmDelete() {
    var self = this;
    var updates = {};
    updates['/CleaningService/' + self.allServices[this.deleteIndex].key] = null;
    firebase.database().ref().update(updates).then(() => {
      self.allServices.splice(self.deleteIndex, 1);
    });
  }
}
