import { Component, OnInit } from '@angular/core'
import { DataCollectorService } from '../data-collector.service'
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.css'],
})
export class TimeSheetComponent implements OnInit {
  public loading: any = false
  public cleanerTimeSheetObj: any
  public mondayFrom: any
  public mondayTo: any
  public tuesdayFrom: any
  public tuesdayTo: any
  public wednesdayFrom: any
  public wednesdayTo: any
  public thursdayFrom: any
  public thursdayTo: any
  public fridayFrom: any
  public fridayTo: any
  public saturdayFrom: any
  public saturdayTo: any
  public sundayFrom: any
  public sundayTo: any

  constructor(public service: DataCollectorService) {
    this.cleanerTimeSheetObj = this.service.cleanerTimeSheetObj
    debugger
    this.getTimeSheet(this.cleanerTimeSheetObj.uid)
    debugger
  }

  ngOnInit() {}

  getTimeSheet(cleanerId) {
    var self = this
    self.loading = true
    firebase
      .database()
      .ref()
      .child('TimeSheet')
      .orderByChild('uid')
      .equalTo(cleanerId)
      .once('value', function (snapshot) {
        var timeSheets = snapshot.val()
        debugger
        for (var key in timeSheets) {
          var timeSheet = timeSheets[key]
          debugger
          self.mondayFrom = timeSheet.mondayFrom
          self.mondayTo = timeSheet.mondayTo
          self.tuesdayFrom = timeSheet.tuesdayFrom
          self.tuesdayTo = timeSheet.tuesdayTo
          self.wednesdayFrom = timeSheet.wednesdayFrom
          self.wednesdayTo = timeSheet.wednesdayTo
          self.thursdayFrom = timeSheet.thursdayFrom
          self.thursdayTo = timeSheet.thursdayTo
          self.fridayFrom = timeSheet.fridayFrom
          self.fridayTo = timeSheet.fridayTo
          self.saturdayFrom = timeSheet.saturdayFrom
          self.saturdayTo = timeSheet.saturdayTo
          self.sundayFrom = timeSheet.sundayFrom
          self.sundayTo = timeSheet.sundayTo
        }
        self.loading = false
      })
  }

  saveTimeSheet() {
    if (this.validate()) {
      this.saveDataFirebase()
    } else {
      alert('Empty Fields')
    }
  }

  saveDataFirebase() {
    var self = this
    var postData = {
      mondayFrom: this.mondayFrom,
      mondayTo: this.mondayTo,
      tuesdayFrom: this.tuesdayFrom,
      tuesdayTo: this.tuesdayTo,
      wednesdayFrom: this.wednesdayFrom,
      wednesdayTo: this.wednesdayTo,
      thursdayFrom: this.thursdayFrom,
      thursdayTo: this.thursdayTo,
      fridayFrom: this.fridayFrom,
      fridayTo: this.fridayTo,
      saturdayFrom: this.saturdayFrom,
      saturdayTo: this.saturdayTo,
      sundayFrom: this.sundayFrom,
      sundayTo: this.sundayTo,
      uid: this.cleanerTimeSheetObj.uid,
      timestamp: Number(new Date()),
    }

    var newPostKey = firebase.database().ref().child('TimeSheet').push().key
    var updates = {}
    updates['/TimeSheet/' + newPostKey] = postData
    firebase
      .database()
      .ref()
      .update(updates)
      .then(function () {
        self.loading = false
        alert('Time Sheet Updated')
      })
  }

  validate() {
    debugger
    if (!this.mondayFrom) {
      return false
    } else if (!this.mondayTo) {
      return false
    } else if (!this.tuesdayFrom) {
      return false
    } else if (!this.tuesdayTo) {
      return false
    } else if (!this.wednesdayFrom) {
      return false
    } else if (!this.wednesdayTo) {
      return false
    } else if (!this.thursdayFrom) {
      return false
    } else if (!this.thursdayTo) {
      return false
    } else if (!this.fridayFrom) {
      return false
    } else if (!this.fridayTo) {
      return false
    } else if (!this.saturdayFrom) {
      return false
    } else if (!this.saturdayTo) {
      return false
    } else if (!this.sundayFrom) {
      return false
    } else if (!this.sundayTo) {
      return false
    }
    debugger
    return true
  }
}
