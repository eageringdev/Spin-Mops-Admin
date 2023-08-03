import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import * as firebase from 'firebase/app'
import { AuthService } from 'src/services/auth/auth.service'
import { setCurrentUserAction } from 'src/store/actions/auth'
import { State } from 'src/store/reducers'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup
  public loginErorMessage: string = ''

  public loginFormSubmitted: boolean = false
  public loginLoading: boolean = false

  constructor(
    public router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private store: Store<State>,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
    this.loginForm.valueChanges.subscribe(() => {
      this.loginErorMessage = ''
    })
  }

  get lForm() {
    return this.loginForm.controls
  }

  tryLogin() {
    this.loginFormSubmitted = true
    if (this.loginForm.invalid) {
      return
    }
    this.loginLoading = true
    this.authService
      .doLogin(this.loginForm.value)
      .then((res) => {
        firebase
          .database()
          .ref()
          .child('Users/' + res.user.uid.toString())
          .once('value')
          .then((userSnapShot) => {
            this.loginLoading = false
            const data = userSnapShot.val()
            console.log(data)
            this.store.dispatch(
              new setCurrentUserAction({
                email: data.email,
                fullName: data.fullName,
                phoneNumber: data.phoneNumber,
                profile: { ...data.profile },
                uid: res.user.uid,
                userName: data.userName,
              }),
            )
            this.router.navigate(['/home'])
          })
          .catch((err) => {
            this.loginLoading = false
            console.log('fetching user data error: ', err)
          })
      })
      .catch((err) => {
        console.log('Login ERROR: ', err)
        this.loginLoading = false
        this.loginErorMessage = err.message
      })
  }
}
