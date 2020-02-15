import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService, END_POINT } from '../../core/services/api/api.service';
export { END_POINT } from '../../config/api.config';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../core/services/common.service';
import { WindowService } from '../../window.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-page-login',
	templateUrl: './page-login.component.html',
})
export class PageLoginComponent implements OnInit {

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private api: ApiService,
    private common: CommonService
    ) { }

  ngOnInit() {
  }


  getUserInfo() {
    this.api.get(['users', 'me']).subscribe(data => {
      this.common.setUser(data);
      this.router.navigateByUrl('/');
    });
  }


  onSubmit(f: NgForm) {
    let body = f.value;
    body = {
      uid: f.value.email,
      password: f.value.password,
    };
    this.api.post(['auth/login'], body).subscribe((data: any) => {
      localStorage.setItem('ACCESS_TOKEN', data.access_token);
      this.getUserInfo();
    },
    (err: any) => {
      f.reset();
    });
  }

  openModal(content, size) {
		this.modalService.open(content, { size: size });
	}

}
