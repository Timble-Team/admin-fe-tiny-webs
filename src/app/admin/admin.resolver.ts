import { Injectable, NgZone } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApiService } from 'app/core/services/api/api.service';
import { CommonService } from 'app/core/services/common.service';
import { MainAppStoreFactoryService } from 'app/core/services/api/firebase.factory';
import * as firebase from 'firebase';
import { AuthService } from 'app/core/services/auth/auth.service';
import { User } from 'app/core/model/user.model';

@Injectable()
export class AdminResolver implements Resolve<any> {
  constructor(
    private common: CommonService,
    private appStore: MainAppStoreFactoryService,
    private ngZone: NgZone
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.appStore.collection('agencies').doc(localStorage.getItem('AGENCY_ID')).get().toPromise().then(data => {
      const agency = this.common.convertRecord(data);
      window['firebase_config'] = agency.firebaseConfig;
      window['config'] = {
        production: true,
        name: 'Hello world',
        firebase: agency.firebaseConfig
      };
      const app = firebase.initializeApp(agency.firebaseConfig);
      return app.firestore().collection('collections').get().then(dataCollection => {
        const collections = this.common.convertRecord(dataCollection);
        this.common.setCollection(collections);
        return app.firestore().collection('categories').get().then(categoriesRes => {
          const categories = this.common.convertRecord(categoriesRes);
          this.common.categories$.next(categories);
        });
      });
    }).catch(e => {
      if (e.status === 401 && this.checkPathDifferWithAuth()) {
        localStorage.setItem('CONTINUOUS_URL', window.location.pathname);
      }
    });
  }

  checkPathDifferWithAuth() {
    return !/^(\/auth)\/.*/.test(window.location.pathname);
  }
}
