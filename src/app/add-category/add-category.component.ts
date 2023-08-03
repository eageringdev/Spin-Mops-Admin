import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  public categoryName: any;
  public loading: any;
  public categoryType: any = 'product';

  constructor() {
  }

  ngOnInit() {
  }

  addCategory() {
    if (this.validate()) {

      var self = this;
      self.loading = true;
      var postData = {
        categoryName: self.categoryName,
        categoryType: self.categoryType,
        timestamp: Number(new Date())
      };

      var newPostKey = firebase.database().ref().child('ProductCategories').push().key;
      var updates = {};
      updates['/ProductCategories/' + newPostKey] = postData;
      firebase.database().ref().update(updates).then(function () {
        self.loading = false;
        alert("Category Saved!!");
      });

    } else {
      alert("Invalid Category Name");
    }
  }

  validate() {
    if (!this.categoryName) {
      return false;
    } else if (!this.categoryType) {
      return false;
    }
    return true;
  }

}
