import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import * as firebase from 'firebase/app'
import { Observable } from 'rxjs'
import { User } from 'src/models/user.model'
import { AuthService } from 'src/services/auth/auth.service'
import { setCurrentUserAction } from 'src/store/actions/auth'
import { getCurrentUser, State } from 'src/store/reducers'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup

  public updateLoading: boolean = false
  public profileFormSubmitted: boolean = false

  public currentUser: User

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<State>,
  ) {
    this.store.pipe(select(getCurrentUser)).subscribe((user) => {
      this.currentUser = user
      if (this.profileForm) {
        this.profileForm.setValue({
          companyName: user ? user.profile.companyName || '' : '',
          location: user ? user.profile.location || '' : '',
          companyContract: user ? user.profile.companyContract || '' : '',
        })
      }
    })
    this.createForm()
  }

  createForm() {
    this.profileForm = this.fb.group({
      companyName: ['', [Validators.required]],
      location: ['', Validators.required],
      companyContract: ['', Validators.required],
    })
    this.profileForm.setValue({
      companyName: this.currentUser
        ? this.currentUser.profile.companyName || ''
        : '',
      location: this.currentUser ? this.currentUser.profile.location || '' : '',
      companyContract: this.currentUser
        ? this.currentUser.profile.companyContract || ''
        : '',
    })
  }

  ngOnInit() {}

  get pForm() {
    return this.profileForm.controls
  }

  tryUpdate() {
    this.profileFormSubmitted = true
    if (this.profileForm.invalid) {
      return
    }

    this.updateLoading = true
    // this.authService.doUpdateProfile(this.profileForm.value)
  }

  doTest() {
    // this.store.pipe(select(getCurrentUser)).subscribe((user) => {
    //   console.log(user)
    // })
    // this.store.dispatch(new setCurrentUserAction(null))
  }
}
