import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import * as firebase from 'firebase'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { LoginComponent } from './login/login.component'

import { LogoutComponent } from './logout/logout.component'
import { SignupComponent } from './signup/signup.component'
import { AddCompanyComponent } from './add-company/add-company.component'
import { HomeComponent } from './home/home.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { AllCleanersComponent } from './all-cleaners/all-cleaners.component'
import { AddCleanerComponent } from './add-cleaner/add-cleaner.component'
import { AddProductComponent } from './add-product/add-product.component'
import { AllProductsComponent } from './all-products/all-products.component'
import { AllCategorisComponent } from './all-categoris/all-categoris.component'
import { AddCategoryComponent } from './add-category/add-category.component'
import { AllOrdersComponent } from './all-orders/all-orders.component'
import { OrderDetailComponent } from './order-detail/order-detail.component'
import { ProfileComponent } from './profile/profile.component'
import { AllDriversComponent } from './all-drivers/all-drivers.component'
import { AddDriverComponent } from './add-driver/add-driver.component'
import { ProductDetailComponent } from './product-detail/product-detail.component'
import { CleanerOrderComponent } from './cleaner-order/cleaner-order.component'
import { TimeSheetComponent } from './time-sheet/time-sheet.component'
import { NgxLoadingModule } from 'ngx-loading'
import { AllCleaningServicesComponent } from './all-cleaning-services/all-cleaning-services.component'
import { AddCleaningServiceComponent } from './add-cleaning-service/add-cleaning-service.component'

//import store
import { StoreModule } from '@ngrx/store'
import { reducers } from 'src/store/reducers'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'add-company', component: AddCompanyComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'all-cleaners', component: AllCleanersComponent },
  { path: 'add-cleaner', component: AddCleanerComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'all-products', component: AllProductsComponent },
  { path: 'all-categories', component: AllCategorisComponent },
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'all-orders', component: AllOrdersComponent },
  { path: 'order-detail', component: OrderDetailComponent },
  { path: 'all-drivers', component: AllDriversComponent },
  { path: 'add-driver', component: AddDriverComponent },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'cleaner-order', component: CleanerOrderComponent },
  { path: 'time-sheet', component: TimeSheetComponent },
  { path: 'all-cleaningServices', component: AllCleaningServicesComponent },
  { path: 'add-cleaningService', component: AddCleaningServiceComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
]

export const config = {
  apiKey: 'AIzaSyBGueJ-JLCxD84BjgUAWE7fxcNvOs17DdM',
  authDomain: 'spin-mops.firebaseapp.com',
  databaseURL: 'https://spin-mops.firebaseio.com',
  projectId: 'spin-mops',
  storageBucket: 'spin-mops.appspot.com',
  messagingSenderId: '763950986921',
}
firebase.initializeApp(config)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    SignupComponent,
    AddCompanyComponent,
    HomeComponent,
    ForgotPasswordComponent,
    AllCleanersComponent,
    AddCleanerComponent,
    AddProductComponent,
    AllProductsComponent,
    AllCategorisComponent,
    AddCategoryComponent,
    AllOrdersComponent,
    OrderDetailComponent,
    ProfileComponent,
    AllDriversComponent,
    AddDriverComponent,
    ProductDetailComponent,
    CleanerOrderComponent,
    TimeSheetComponent,
    AllCleaningServicesComponent,
    AddCleaningServiceComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    NgxLoadingModule.forRoot({}),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
