import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { DataCollectorService } from '../data-collector.service';


@Component({
  selector: 'app-all-cleaners',
  templateUrl: './all-cleaners.component.html',
  styleUrls: ['./all-cleaners.component.css']
})
export class AllCleanersComponent implements OnInit {

  public loading: any;
  public allCleaners: Array<any> = [];
  public deleteIndex: any;

  constructor(public router: Router,
    public service: DataCollectorService) {
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
          self.allCleaners.push(cleaner);
        }
        self.loading = false;
      });
  }

  toTimeSheet(index) {
    debugger;
    this.service.cleanerTimeSheetObj = this.allCleaners[index];
    debugger;
    this.router.navigate(['/time-sheet']);
  }

  deleteProduct(index) {
    this.deleteIndex = index;
  }

  confirmDeleteProduct() {
    var self = this;
    var updates = {};
    updates['/Cleaners/' + self.allCleaners[this.deleteIndex].key] = null;
    firebase.database().ref().update(updates).then(() => {
      self.allCleaners.splice(self.deleteIndex, 1);
    });
  }


  editCleaner(index) {
    this.service.editCleaner = true;
    this.service.cleanerObject = this.allCleaners[index];
    this.router.navigate(['/add-cleaner']);
    /* routerLink="/add-cleaner" */
  }

}
