import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService, END_POINT } from '../../core/services/api/api.service';
export { END_POINT } from '../../config/api.config';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../core/services/common.service';
import { WindowService } from '../../window.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginForm } from './login.data';
import { ReactiveFormComponent } from '@theflames/reactive-form';
import { MainAppAuthFactoryService, MainAppStoreFactoryService } from 'app/core/services/api/firebase.factory';
import { auth } from 'firebase/app';
import * as firebase from 'firebase';
import { AdminEnum } from 'app/shared/enum/admin.enum';
import { of } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm = new LoginForm();
  loginMethod = null;
  @ViewChild(ReactiveFormComponent, {static: false}) formComp: ReactiveFormComponent;


  constructor(
    private router: Router,
    private modalService: NgbModal,
    private api: ApiService,
    private appAuth: MainAppAuthFactoryService,
    private appStore: MainAppStoreFactoryService,
    private common: CommonService,
    ) { }

  ngOnInit() {
    // this.appStore.collection('agencies').doc(localStorage.getItem('AGENCY_ID')).get().toPromise().then(data => {
    //   const agency = this.common.convertRecord(data);
    //   console.log(agency);
    // });
  }

  setMethod(method) {
    this.loginMethod = method;
  }


  getUserInfo(email, token) {
    this.appStore.collection('users').ref.where('email', '==', email).get().then(data => {
      const users = this.common.convertRecord(data);
      if (users[0]) {
        this.appStore
          .collection('users')
          .doc(users[0].id)
          .set({accessToken: token}, { merge: true }).then(res => {
            this.common.setCurrentUser(users[0]);
            this.router.navigateByUrl('/');
          }).catch(error => {
            console.log(error);
          });
      }
    });
  }

  submitForm() {
    this.formComp.handleSubmit(null);
  }

  onSubmit(event) {
    if (this.formComp.valid) {
      this.appStore.collection('users').ref.where('email', '==', event.email).get().then(data => {
        const users = this.common.convertRecord(data);
        if (users[0]) {
          users[0].agencies.forEach((x, index) => {
            x.get().then(res => {
              const agency = this.common.convertRecord(res);
              users[0].agencies[index] = agency;
              if (index === users[0].agencies.length - 1) {
                this.common.setCurrentUser(users[0]);
                this.common.setCurrentAgencies(users[0].agencies);
                window['firebase_config'] = users[0].agencies[0].firebaseConfig;
                window['config'] = {
                  production: true,
                  name: 'Hello world',
                  firebase: users[0].agencies[0].firebaseConfig
                };
                localStorage.setItem('AGENCY_ID', users[0].agencies[0].id);
                localStorage.setItem('USER_ROLE', AdminEnum[users[0].role]);
                this.googleAuth(event.email, users[0].agencies[0].firebaseConfig, users[0].role, users[0].agencies[0].id);
              }
            });
          });
        }
      });
    }
  }

  googleAuth(email, providerConfig, role, agencyId) {
    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({
      'login_hint': email,
      'prompt': 'select_account'
    });
    if (+role === 0) {
      return this.appAuth.auth.signInWithPopup(provider)
        .then((result) => {
          console.log('You have been successfully logged in!', result);
          localStorage.setItem('ACCESS_TOKEN', result.credential['accessToken']);
          this.getUserInfo(result.user.email, result.credential['accessToken']);
        }).catch((error) => {
          console.log(error);
        });
    } else {
      const app = firebase.initializeApp(providerConfig);
      return app.auth().signInWithPopup(provider)
        .then((result) => {
          app.firestore().collection('users').where('email', '==', email).get().then(data => {
            const user = this.common.convertRecord(data)[0];
            const asyncRequest = !user ? app.firestore().collection('users').doc(result.user.uid).set({
              email: email,
              role: role
            }) : of(null).toPromise();

            asyncRequest.then(res => {
              localStorage.setItem('AGENCY_ID', agencyId);
              localStorage.setItem('USER_ID', result.user.uid);
              this.router.navigate(['/']);
            });
          });
        }).catch((error) => {
          console.log(error);
        });
    }
  }

}
