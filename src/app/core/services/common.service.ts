
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({providedIn: 'root'})
export class CommonService {

  breadcrumb$: BehaviorSubject<any>;
  user$: BehaviorSubject<any>;
  agencies$: BehaviorSubject<any>;
  loadingScreen$: BehaviorSubject<any>;


  constructor(
    private route: ActivatedRoute
  ) {
    this.breadcrumb$ = new BehaviorSubject<any>([]);
    this.user$ = new BehaviorSubject<any>(null);
    this.agencies$ = new BehaviorSubject<any>(null);
    this.loadingScreen$ = new BehaviorSubject<any>(null);
  }

  setLoading(display, message = 'Please wait!') {
    this.loadingScreen$.next({display, message});
  }

  setLocal(name: any, value: any) {
    name.forEach((nameLocal, index) => {
      typeof value[index] === 'string' ?
      localStorage.setItem(nameLocal, value[index]) :
      localStorage.setItem(nameLocal, JSON.stringify(value[index]));
    });
  }

  calcPhotographers(contracts) {
    return contracts.reduce((sum, x) => {
      const temp = Math.round(x.total_member / 20);
      return x.packages.filter(y => y.kind_package === 3).length > 0 ? sum + temp + 1 : sum + temp;
    }, 0);
  }

  removeLocal(name: any) {
    name.forEach(nameLocal => {
      localStorage.removeItem(nameLocal);
    });
  }


  getAdminRole() {
    return JSON.parse(localStorage.getItem('USER')).role;
  }

  changeBreadcrumb(value) {
    this.breadcrumb$.next(value);
  }

  setUser(data) {
    if (data) {
      this.user$.next(data.user || null);
      this.agencies$.next(data.agencies || null);
    } else {
      this.agencies$.next(null);
      this.user$.next(null);
    }
  }

  getUser() {
    return this.user$.value;
  }

  setBreadCrumb(value) {
    console.log(value);
    const tempCrumb = this.breadcrumb$.value;
    if (value.level > tempCrumb.length) {
      tempCrumb.push(value);
    } else if (value.level === tempCrumb.length) {
      tempCrumb[tempCrumb.length - 1] = value;
    } else {
      tempCrumb[value.level - 1] = value;
      tempCrumb.splice(value.level);
    }
    this.breadcrumb$.next(tempCrumb);
  }
}
