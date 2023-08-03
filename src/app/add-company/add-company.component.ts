import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from 'src/services/auth/auth.service'

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css'],
})
export class AddCompanyComponent implements OnInit {
  public addCompanyForm: FormGroup

  public addCompanyFormSubmitted: boolean = false
  public signUpLoading: boolean = false
  public signUpErrorMessage: string = ''

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    const beforeValue: any =
      JSON.parse(localStorage.getItem('addcompany_info')) || {}
    this.addCompanyForm = this.fb.group({
      companyName: [beforeValue.companyName || '', [Validators.required]],
      location: [beforeValue.location || '', Validators.required],
      companyContract: [
        beforeValue.companyContract || '',
        [Validators.required],
      ],
    })
  }

  get cForm() {
    return this.addCompanyForm.controls
  }

  onGoBack() {
    localStorage.setItem(
      'addcompany_info',
      JSON.stringify(this.addCompanyForm.value),
    )
    this.router.navigate(['/signup'])
  }

  tryRegister() {
    this.addCompanyFormSubmitted = true
    if (this.addCompanyForm.invalid) {
      return
    }
    this.signUpLoading = true
    const signUpValue = {
      ...JSON.parse(localStorage.getItem('signup_info')),
      profile: this.addCompanyForm.value,
    }
    console.log(signUpValue)
    this.authService
      .doRegister(signUpValue)
      .then((res) => {
        console.log(res)
        localStorage.removeItem('signup_info')
        localStorage.removeItem('addcompany_info')
        this.signUpLoading = false
        this.router.navigate(['/home'])
      })
      .catch((err) => {
        this.signUpLoading = false
        this.signUpErrorMessage = err.message
        console.log('Signup ERROR: ', err)
      })
  }
}
