import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from 'app/core/services/api/firebase.service';
import { of } from 'rxjs';

@Injectable()
export class VideoEditResolver implements Resolve<any> {
  constructor(
    private firebase: FirebaseService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const asyncReq = [this.firebase.listRecords('Category', {key: 'type', value: 'Video', compared: '=='})];
    if (route.params.id) {
      asyncReq.push(this.firebase.getRecord('Video', route.params.id));
    } else {
      asyncReq.push(of(null).toPromise());
    }
    return Promise.all(asyncReq).then((res: any) => {
      return {
        categories: this.firebase.convertRecord(res[0]).map(x => ({ value: x.key, label: x.name })),
        video: res[1] ? {id: res[1].id, ...res[1].data()} : null
      };
    });
  }
}
