import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router) {
    // firebase.auth().currentUser.delete()
    firebase
      .auth()
      .signOut()
      .then((res) => {
        console.log('Signed out: ', res)
        this.router.navigate(['/'])
      })
      .catch((err) => {
        console.log('signing out error: ', err)
      })
  }

  ngOnInit() {}
}
