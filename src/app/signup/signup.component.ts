import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { CustomValidators } from 'src/providers/CustomValidators'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public registerForm: FormGroup

  public registerFormSubmitted: boolean = false

  constructor(private router: Router, private fb: FormBuilder) {
    this.createForm()
  }

  createForm() {
    const beforeValue: any =
      JSON.parse(localStorage.getItem('signup_info')) || {}
    this.registerForm = this.fb.group(
      {
        fullName: [beforeValue.fullName || '', [Validators.required]],
        userName: [beforeValue.userName || '', Validators.required],
        email: [
          beforeValue.email || '',
          [Validators.required, Validators.email],
        ],
        phoneNumber: [beforeValue.phoneNumber || '', Validators.required],
        password: [beforeValue.password || '', [Validators.required]],
        passwordConfirm: [
          beforeValue.passwordConfirm || '',
          Validators.required,
        ],
      },
      { validator: CustomValidators.mustMatch('password', 'passwordConfirm') },
    )
  }

  ngOnInit() {}

  get rForm() {
    return this.registerForm.controls
  }

  onNext() {
    this.registerFormSubmitted = true
    if (this.registerForm.invalid) {
      return
    }
    localStorage.setItem('signup_info', JSON.stringify(this.registerForm.value))
    this.router.navigate(['/add-company'])
  }
}
