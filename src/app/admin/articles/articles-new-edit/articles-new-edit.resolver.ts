import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApiService } from 'app/core/services/api/api.service';
import { CommonService } from 'app/core/services/common.service';
import { FirebaseService } from 'app/core/services/api/firebase.service';
import { of, forkJoin } from 'rxjs';

@Injectable()
export class ArticlesEditResolver implements Resolve<any> {
  constructor(
    private firebase: FirebaseService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const asyncReq = [this.firebase.listRecords('Category', {key: 'type', value: 'Article', compared: '=='})];
    if (route.params.id) {
      asyncReq.push(this.firebase.getRecord('Article', route.params.id));
    } else {
      asyncReq.push(of(null).toPromise());
    }
    return Promise.all(asyncReq).then((res: any) => {
      return {
        categories: this.firebase.convertRecord(res[0]).map(x => ({ value: x.key, label: x.name })),
        article: res[1] ? {id: res[1].id, ...res[1].data()} : null
      };
    });
  }
}
