import { Component, OnInit } from '@angular/core'
import * as firebase from 'firebase'
import { DataCollectorService } from '../data-collector.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  public loading: any
  public allCategories: Array<any> = []
  public categoryKey: any
  public productTitle: any
  public productPrice: any
  public productBrand: any
  public shippingFee: any
  public productQuantity: any
  public productDescription: any
  public productImage: any
  public filesArray: any = []
  public imagesCount: any
  public productImageUrl: any
  public imagesURLS: Array<any> = []
  public imagesSavedCount: any = 0

  public thumbnailImageURL = ''

  public editProduct = false
  public editProductObject: any

  constructor(public service: DataCollectorService, public router: Router) {
    this.editProduct = service.editProduct
    if (this.editProduct) {
      this.service.editProduct = false
      this.editProductObject = service.editProductObject
      this.mapEditProductData()
    }
    this.getAllCategories()
  }

  ngOnInit() {}

  getAllCategories() {
    this.loading = true
    firebase
      .database()
      .ref()
      .child('ProductCategories')
      .once('value', (snapshot) => {
        var categories = snapshot.val()
        for (var key in categories) {
          var category = categories[key]
          category.key = key
          if (category.categoryType == 'product') {
            this.allCategories.push(category)
          }
        }
        this.loading = false
      })
  }

  cleaningCategoryChange(event) {
    this.categoryKey = event
  }

  addProduct() {
    if (this.productImage) {
      if (this.validate()) {
        this.saveActivityImageThumbnail()
      } else {
        alert('Empty Fields!!')
      }
    } else {
      alert('Select Product Image!!')
    }
  }

  saveActivityImageThumbnail() {
    this.loading = true
    let storageRef = firebase.storage().ref()

    var metadata = {
      contentType: 'image/jpeg/png',
    }
    const filename = Math.floor(Date.now() / 1000)
    var uploadTask = storageRef
      .child('productImages/' + filename)
      .put(this.productImage, metadata)
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {},
      (error) => {
        alert(error.message)
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.productImageUrl = downloadURL
          if (this.imagesCount > 0) {
            this.saveFileMultiple()
          } else {
            this.saveProductFirebase()
          }
        })
      },
    )
  }

  uploadfiles(imagePath, i) {
    let storageRef = firebase.storage().ref()

    const filename = Math.floor(Date.now() / 1000)
    var metadata = {
      contentType: 'image/jpeg/png',
    }
    var uploadTask = storageRef
      .child('productImages/' + imagePath.name + i)
      .put(imagePath, metadata)
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {},
      (error) => {
        alert(error.message)
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(this.imagesURLS)
          this.imagesURLS.push(downloadURL)
          this.imagesSavedCount--
          this.checkAllImagesSaved()
        })
      },
    )
  }

  checkAllImagesSaved() {
    var self = this
    if (this.imagesSavedCount == 0) {
      this.saveProductFirebase()
    }
  }

  saveFileMultiple() {
    this.loading = true
    this.imagesSavedCount = this.imagesCount
    if (this.imagesSavedCount != 0) {
      for (var i = 0; i < this.imagesCount; i++) {
        this.uploadfiles(this.filesArray[i], i)
      }
    }
  }

  saveProductFirebase() {
    var postData = {
      category: this.categoryKey || ' ',
      productTitle: this.productTitle || ' ',
      productPrice: this.productPrice || ' ',
      productBrand: this.productBrand || ' ',
      /* shippingFee: this.shippingFee || " ", */
      productQuantity: this.productQuantity || ' ',
      productDescription: this.productDescription || ' ',
      additionalImages: this.imagesURLS || [],
      productThumbnail: this.productImageUrl,
      timestamp: Number(new Date()),
    }

    var newPostKey = firebase.database().ref().child('Products').push().key
    var updates = {}
    updates['/Products/' + newPostKey] = postData
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        this.loading = false
        alert('Product Saved!!')
      })
  }

  onChangeFile(event) {
    // let eventObj: MSInputMethodContext = <MSInputMethodContext>event
    // let target: HTMLInputElement = <HTMLInputElement>eventObj.target
    let files: FileList = event.target.files
    if (files[0]) {
      this.productImage = files[0]
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = (event) => {
        this.thumbnailImageURL = reader.result.toString()
      }
    }
  }

  onRemoveThumbnailImage() {
    this.productImage = undefined
    this.thumbnailImageURL = ''
  }

  onChangeAdditionalFile(event) {
    // let eventObj: MSInputMethodContext = <MSInputMethodContext>event
    // let target: HTMLInputElement = <HTMLInputElement>eventObj.target
    let files: FileList = event.target.files
    if (files.length) {
      this.filesArray = files
      this.imagesCount = files.length
    }
  }

  onRemoveOtherImages() {
    this.filesArray = []
    this.imagesCount = 0
  }

  validate() {
    if (!this.categoryKey) {
      return false
    } else if (!this.productTitle) {
      return false
    } else if (!this.productPrice) {
      return false
    } /* else if (!this.shippingFee) {
      return false;
    } */ else if (
      !this.productQuantity
    ) {
      return false
    } else if (!this.productDescription) {
      return false
    }
    return true
  }

  mapEditProductData() {
    this.categoryKey = this.editProductObject.category
    this.productTitle = this.editProductObject.productTitle
    this.productBrand = this.editProductObject.productBrand || ''
    /* this.shippingFee = this.editProductObject.shippingFee; */
    this.productQuantity = this.editProductObject.productQuantity
    this.productDescription = this.editProductObject.productDescription
    this.productPrice = this.editProductObject.productPrice
  }

  cancelClicked() {
    this.router.navigate(['/home'])
  }

  saveEdits() {
    if (!this.validate()) {
      alert('Invalid Fields')
      return
    }

    this.loading = true
    var updates = {}
    updates[
      '/Products/' + this.editProductObject.key + '/category'
    ] = this.categoryKey
    updates[
      '/Products/' + this.editProductObject.key + '/productTitle'
    ] = this.productTitle
    updates['/Products/' + this.editProductObject.key + '/productBrand'] =
      this.productBrand || ''
    /* updates['/Products/' + this.editProductObject.key + "/shippingFee"] = this.shippingFee; */
    updates[
      '/Products/' + this.editProductObject.key + '/productQuantity'
    ] = this.productQuantity
    updates[
      '/Products/' + this.editProductObject.key + '/productDescription'
    ] = this.productDescription
    updates[
      '/Products/' + this.editProductObject.key + '/productPrice'
    ] = this.productPrice

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        this.loading = false
        alert('Product Edited!!')
      })
  }
}
