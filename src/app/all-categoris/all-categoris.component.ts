import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { DataCollectorService } from '../data-collector.service';


@Component({
  selector: 'app-all-categoris',
  templateUrl: './all-categoris.component.html',
  styleUrls: ['./all-categoris.component.css']
})
export class AllCategorisComponent implements OnInit {

  public loading: any;
  public allCategories: Array<any> = [];

  constructor(public router: Router,
    public service: DataCollectorService) {
    this.getAllCategories();
  }

  ngOnInit() {
  }


  getAllCategories() {

    var self = this;
    self.loading = true;
    firebase.database().ref().child('ProductCategories')
      .once('value', function (snapshot) {
        var categories = snapshot.val();
        for (var key in categories) {
          var category = categories[key];
          category.key = key;
          self.allCategories.push(category);
        }
        self.loading = false;
      });
  }

  goToProducts(index) {
    debugger;
    this.service.filterProducts = true;
    this.service.filterCategoryKey = this.allCategories[index].key;
    this.router.navigate(['/all-products']);
  }
}
