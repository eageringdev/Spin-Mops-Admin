import { Component, OnInit } from '@angular/core'
import * as firebase from 'firebase'
import { DataCollectorService } from '../data-collector.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-cleaner',
  templateUrl: './add-cleaner.component.html',
  styleUrls: ['./add-cleaner.component.css'],
})
export class AddCleanerComponent implements OnInit {
  public fullName: any
  public contact: any
  public email: any
  public ratePerHour: any
  public ratePerWeek: any
  public ratePerDay: any
  public gender: any = 'male'
  public loading: any
  public address: any
  public password: any
  public errorTxt: any = 'Invalid Fields'

  //Edit Cleaner Case..
  public editCleaner: any = false
  public cleanerObject: any
  /*  this.service.editCleaner = true;
   this.service.cleanerObject = this.allCleaners[index]; */

  constructor(public service: DataCollectorService, public router: Router) {
    this.editCleaner = service.editCleaner
    if (this.editCleaner) {
      this.service.editCleaner = false
      this.cleanerObject = service.cleanerObject
      debugger
      this.mapEditCleanerData()
    }
  }

  ngOnInit() {}

  createCleanerCloudCode() {
    var self = this
    if (!self.validate()) {
      alert(this.errorTxt)
      return
    }

    self.loading = true
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then((res) => {
        console.log('current user: ', firebase.auth().currentUser)
        this.saveCleaner(res.user.uid)
      })
      .catch((err) => {
        console.log(err)
        this.loading = false
      })
    // var createUser = firebase.functions().httpsCallable('createUser')
    // createUser({
    //   name: this.fullName,

    // }).then(
    //   (result) => {
    //     if (result.data) {
    //       this.saveCleaner(result.data.data.uid)
    //     } else {
    //       alert(result.data.data)
    //       this.loading = false
    //     }
    //   },
    //   (error) => {
    //     alert(error)
    //   },
    // )
  }

  saveCleaner(uid) {
    var self = this
    var postData = {
      name: this.fullName || ' ',
      contact: this.contact || ' ',
      email: this.email || ' ',
      ratePerHour: this.ratePerHour || ' ',
      ratePerWeek: this.ratePerWeek || ' ',
      ratePerDay: this.ratePerDay || ' ',
      gender: this.gender || ' ',
      address: this.address || '',
      uid: uid,
      timestamp: Number(new Date()),
    }

    var newPostKey = firebase.database().ref().child('Cleaners').push().key
    var updates = {}
    updates['/Cleaners/' + newPostKey] = postData
    firebase
      .database()
      .ref()
      .update(updates)
      .then(function () {
        self.loading = false
        alert('Cleaner Added!!')
        self.router.navigate(['/all-cleaners'])
      })
  }

  mapEditCleanerData() {
    this.fullName = this.cleanerObject.name
    this.contact = this.cleanerObject.contact
    this.gender = this.cleanerObject.gender
    this.address = this.cleanerObject.address
    this.email = this.cleanerObject.email
    this.password = '*********'
  }

  validate() {
    if (!this.fullName) {
      return false
    } else if (!this.contact) {
      return false
    } else if (!this.gender) {
      return false
    } else if (!this.address) {
      return false
    } else if (!this.password) {
      return false
    } else if (this.password.length < 6) {
      return false
    } else if (!this.email) {
      return false
    } else if (!this.email.includes('@') || !this.email.includes('.')) {
      this.errorTxt = 'Incorrect Email'
      return false
    } else if (this.contact.length != 8) {
      this.errorTxt = 'Invalid Phone Number'
      return false
    }
    return true
  }

  saveEdits() {
    var self = this
    if (!self.validate()) {
      alert(this.errorTxt)
      return
    }
    self.loading = true
    var updates = {}
    updates['/Cleaners/' + self.cleanerObject.key + '/name'] = self.fullName
    updates['/Cleaners/' + self.cleanerObject.key + '/contact'] = self.contact
    updates['/Cleaners/' + self.cleanerObject.key + '/gender'] = self.gender
    updates['/Cleaners/' + self.cleanerObject.key + '/address'] = self.address
    updates['/Cleaners/' + self.cleanerObject.key + '/email'] = self.email

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        self.loading = false
        alert('Cleaner Edited!!')
      })
  }
}
