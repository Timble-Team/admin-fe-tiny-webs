import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApiService } from 'app/core/services/api/api.service';
import { CommonService } from 'app/core/services/common.service';
import { FirebaseService } from 'app/core/services/api/firebase.service';
import { of, forkJoin } from 'rxjs';
import { AdminForm } from 'app/admin/admin.form';

@Injectable()
export class InstanceListResolver implements Resolve<any> {
  constructor(
    private firebase: FirebaseService,
    private common: CommonService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const localCurrentInstance = JSON.parse(localStorage.getItem('CUR_COLLECTION'));
    const categories = this.common.categories$.value.filter(x => x.type === localCurrentInstance.id);
    const currentInstance = this.common.collections$.value.find(x => x.id === localCurrentInstance.id);
    return this.firebase.listPaginationRecords(currentInstance.id).then((res: any) => {
      const instances = this.firebase.convertRecord(res).map(x => {
        const nameObj = categories.find(cat => +cat.key === +x.kind);
        x.kind = nameObj ? nameObj.name : 'undefined';
        return x;
      });
      return {
        categories,
        instances,
        objectName: currentInstance.id,
        cols: currentInstance.formConfig(categories)
          .filter(x => x.mainLabel)
          .map(x => ({field: x.key, header: x.labelName}))
      };
    });
  }
}
