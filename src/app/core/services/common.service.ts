
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { articleFormData } from './default-config/article.form';
import { videoFormData } from './default-config/video.form';
import { albumFormData } from './default-config/album.form';

@Injectable({providedIn: 'root'})
export class CommonService {

  breadcrumb$: BehaviorSubject<any>;
  user$: BehaviorSubject<any>;
  agencies$: BehaviorSubject<any>;
  loadingScreen$: BehaviorSubject<any>;
  collections$: BehaviorSubject<any>;
  categories$: BehaviorSubject<any>;

  defaultCollections = [
    {
      formConfig: articleFormData,
      id: 'articles',
      name: 'bài viết'
    },
    {
      formConfig: videoFormData,
      id: 'videos',
      name: 'video'
    },
    {
      formConfig: albumFormData,
      id: 'albums',
      name: 'album'
    }
  ];

  constructor(
    private route: ActivatedRoute
  ) {
    this.breadcrumb$ = new BehaviorSubject<any>([]);
    this.user$ = new BehaviorSubject<any>(null);
    this.agencies$ = new BehaviorSubject<any>(null);
    this.loadingScreen$ = new BehaviorSubject<any>(null);
    this.categories$ = new BehaviorSubject<any>(null);
    this.collections$ = new BehaviorSubject<any>(this.defaultCollections);
  }

  convertRecord(res) {
    try {
      if (res.data()) {
        return {
          id: res.id,
          ...res.data()
        };
      }
    } catch (e) {
      const sum = [];
      res.forEach(doc => {
        sum.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return sum;
    }
  }

  setCollection(value) {
    this.collections$.next([
      ...this.defaultCollections,
      ...value
    ]);
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

  setCurrentUser(user) {
    this.user$.next(user);
  }

  setCurrentAgencies(agencies) {
    this.agencies$.next(agencies);
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
