import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/core/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencyForm } from './agencies-new-edit.data';
import { ApiService } from 'app/core/services/api/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-agencies-new-edit',
  templateUrl: './agencies-new-edit.component.html',
})
export class AgenciesNewEditComponent implements OnInit {
  configForm = new AgencyForm();

  constructor(
    private api: ApiService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  onSubmit(data) {
    data.firebaseConfig = eval('(' + data.firebaseConfig + ')');
    this.api.post(['agencys'], data).subscribe(res => {
      this.router.navigate(['/agencies']);
      this.messageService.add({severity: 'success', summary: 'Tạo đơn vị thành công', detail: 'Về danh sách đơn vị'});
    });
  }

}
