import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Promise<boolean>;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  constructor(
    private location: Location,
    private router: Router
  ) { }

  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot) {
    if (component.canDeactivate) {
      return component.canDeactivate().then(canDeactivate => {
        console.log(this.router.getCurrentNavigation().trigger, currentState.url);
        if (!canDeactivate && this.router.getCurrentNavigation().trigger === 'popstate') {
          this.location.forward();
          this.location.go(currentState.url);
        }
        if (!canDeactivate && this.router.getCurrentNavigation().trigger === 'imperative') {
          this.router.navigateByUrl(currentState.url);
        }
        return canDeactivate;
      });
    } else {
      return true;
    }
  }
}
