import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotNullObj } from 'app/shared/common';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() rows = 0;
  @Input() totalRecords = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  paginate(event) {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { page: event.page + 1 },
        queryParamsHandling: 'merge'
      });
  }
}
