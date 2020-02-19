import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService, END_POINT } from '../../core/services/api/api.service';
export { END_POINT } from '../../config/api.config';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../core/services/common.service';
import { WindowService } from '../../window.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginForm } from './login.data';
import { ReactiveFormComponent } from '@theflames/reactive-form';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm = new LoginForm();
  @ViewChild(ReactiveFormComponent, {static: false}) formComp: ReactiveFormComponent;


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

  submitForm() {
    this.formComp.handleSubmit(null);
  }

  onSubmit(event) {
    if (this.formComp.valid) {
      const body = {
        uid: event.email,
        password: event.password,
      };
      this.api.post(['auth/login'], body).subscribe((data: any) => {
        localStorage.setItem('ACCESS_TOKEN', data.access_token);
        this.getUserInfo();
      },
      (err: any) => {
        this.formComp.form.reset();
      });
    }
  }
}
