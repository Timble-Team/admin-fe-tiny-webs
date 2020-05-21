import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApiService } from 'app/core/services/api/api.service';
import { CommonService } from 'app/core/services/common.service';
import { FirebaseService } from 'app/core/services/api/firebase.service';
import { of, forkJoin } from 'rxjs';
import { AdminForm } from 'app/admin/admin.form';

@Injectable()
export class InstanceNewEditResolver implements Resolve<any> {
  constructor(
    private firebase: FirebaseService,
    private common: CommonService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const localCurrentInstance = JSON.parse(localStorage.getItem('CUR_COLLECTION'));
    const categories = this.common.categories$.value
      .filter(x => x.type === localCurrentInstance.id)
      .map(x => ({ value: x.key, label: x.name }));
    const currentInstance = this.common.collections$.value.find(x => x.id === localCurrentInstance.id);
    let asyncReq = of(null).toPromise();
    if (route.params.id) {
      asyncReq = this.firebase.getRecord(currentInstance.id, route.params.id);
    }
    return asyncReq.then((res: any) => {
      return {
        categories,
        objectName: currentInstance.id,
        instance: res ? {id: res.id, ...res.data()} : null,
        form: new AdminForm(currentInstance.formConfig(categories)).config
      };
    });
  }
}
