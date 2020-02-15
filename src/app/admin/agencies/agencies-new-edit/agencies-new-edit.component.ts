import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'app/core/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencyForm } from './agencies-new-edit.data';
import { ApiService } from 'app/core/services/api/api.service';
import { MessageService } from 'primeng/api';
import { ReactiveFormService, ReactiveFormComponent } from '@theflames/reactive-form';
import { ToggleButtonComponent } from 'app/shared/components/custom-form/toggle-button/toggle-button.component';


@Component({
  selector: 'app-agencies-new-edit',
  templateUrl: './agencies-new-edit.component.html',
})
export class AgenciesNewEditComponent implements OnInit {
  configForm = new AgencyForm();
  @ViewChild(ReactiveFormComponent, {static: false}) formComp: ReactiveFormComponent;

  constructor(
    private api: ApiService,
    private router: Router,
    private messageService: MessageService,
    private reactiveService: ReactiveFormService
  ) { }

  ngOnInit() {
    this.reactiveService.setCustomComponents({
      switcher: ToggleButtonComponent
    });
  }

  onSubmit(data) {
    if (this.formComp.valid) {
      data.firebaseConfig = eval('(' + data.firebaseConfig + ')');
      this.api.post(['agencys'], data).subscribe(res => {
        this.router.navigate(['/agencies']);
        this.messageService.add({severity: 'success', summary: 'Tạo đơn vị thành công', detail: 'Về danh sách đơn vị'});
      });
    }
  }

}
