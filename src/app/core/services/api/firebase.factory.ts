import { Injectable, NgZone } from '@angular/core';
import { environment } from 'environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';


// @Injectable({
//   providedIn: 'root'
// })

@Injectable()
export class MainAppStoreFactoryService extends AngularFirestore {}

export function MainAppStoreFactory(platformId: Object, zone: NgZone) {
  return new AngularFirestore(environment.firebaseConfig, 'mainAppStore', false, null, platformId, zone, {});
}

export class MainAppAuthFactoryService extends AngularFireAuth {}

export function MainAppAuthFactory(platformId: Object, zone: NgZone) {
  return new AngularFireAuth(environment.firebaseConfig, 'mainAppAuth', platformId, zone);
}


