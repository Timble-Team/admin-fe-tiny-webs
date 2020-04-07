import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotNullObj } from 'app/shared/common';


@Component({
  selector: 'app-filter-toolbar',
  templateUrl: './filter-toolbar.component.html',
})
export class FilterToolbarComponent {
  toolbar = {
    q: null
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  filterAndSearch () {
    const obj = new NotNullObj(this.toolbar);
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: obj,
        queryParamsHandling: 'merge'
      });
  }

}
