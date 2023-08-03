import { Injectable } from '@angular/core'

import * as firebase from 'firebase/app'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
    })
    // firebase
    //   .database()
    //   .ref()
    //   .child('Users/VOYWiiirdKZYVLp8HiAMM3ZhZdI3')
    //   .once('value')
    //   .then((snap) => {
    //     firebase
    //       .database()
    //       .ref()
    //       .child('Users/VOYWiiirdKZYVLp8HiAMM3ZhZdI3')
    //       .set({
    //         ...snap.val(),
    //         profile: {
    //           companyName: 'Lucky',
    //           location: 'Hypo',
    //           companyContract: '123 456 7890',
    //         },
    //       })
    //       .then(() => {
    //         console.log('hhhhhh')
    //       })
    //   })
  }

  doRegister(value: any) {
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password)
        .then((res) => {
          const data = { ...value, password: '', passwordConfirm: '' }
          firebase
            .database()
            .ref()
            .child('Users/' + res.user.uid.toString())
            .set(data)
            .then(() => {
              resolve(res)
            })
            .catch((err) => {
              console.log('saving user error: ', err)
            })
        })
        .catch((err) => reject(err))
    })
  }

  doLogin(value: any) {
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
  }

  getProfile() {
    return new Promise<any>((resolve, reject) => {
      if (!firebase.auth().currentUser) {
        resolve({})
      }
      const uid = firebase.auth().currentUser.uid
      console.log('uid: ', uid)
      firebase
        .database()
        .ref()
        .child('Users/' + uid.toString())
        .once('value')
        .then((snapShot) => {
          const profile = snapShot.val().profile
          resolve(profile)
        })
        .catch((err) => reject(err))
    })
  }

  // doUpdateProfile(value) {
  //   return new Promise<any>((resolve, reject) => {
  //     const uid = firebase.auth().currentUser.uid
  //     firebase
  //       .database()
  //       .ref()
  //       .child('Users/' + uid.toString())
  //       .once('value')
  //       .then((snapShot) => {
  //         const newValue = {...snapShot.val(), profile:value};
  //         firebase
  //         .database()
  //         .ref()
  //         .child('Users/' + uid.toString()).set()
  //       })
  //       .catch((err) => reject(err))
  //   })
  // }
}
