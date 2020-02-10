import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApiService } from 'app/core/services/api/api.service';
import { CommonService } from 'app/core/services/common.service';

@Injectable()
export class AdminResolver implements Resolve<any> {
  constructor(
    private api: ApiService,
    private common: CommonService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.api.get(['users', 'me'])
			.toPromise().then((res: any) => {
        this.common.setUser(res);
        window['firebase_config'] = res.agencies[0].firebaseConfig;
        window['config'] = {
          production: true,
          name: 'Hello world',
          firebase: res.agencies[0].firebaseConfig
        };
        return res;
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
