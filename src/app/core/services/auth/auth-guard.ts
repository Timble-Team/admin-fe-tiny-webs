import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonService } from '../common.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
    return true;
  }
}

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/admin');
      return false;
    }
    return true;
  }
}

@Injectable({providedIn: 'root'})
export class InstanceGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private common: CommonService,
    private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const collections = this.common.collections$.value;
    const currentCollection = collections.find(x => x.id === route.params.instance);
    localStorage.setItem('CUR_COLLECTION', JSON.stringify(currentCollection));
    return true;
  }
}
