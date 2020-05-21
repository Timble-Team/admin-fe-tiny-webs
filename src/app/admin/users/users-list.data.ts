import { Validators } from '@angular/forms';
import { calcEnumTypeString } from 'app/shared/common';
import { CategoryTypeEnum } from 'app/core/model/category.model';

export class UsersForm {
  form = {};

  generateForm() {
    this.form = {
      form: {
        submitButton: {
          title: 'Tạo / Sửa user',
          disabledInit: false, // default is false,
          extraClass: 'btn ui-button full-width pt-2 pb-2 mt-2'
        },
        matchField: [],
      },
      config: [
        {
          key: 'id',
          inputType: {
            name: 'input',
            type: 'hidden'
          },
          validation: [
          ],
          errors: {
          },
        },
        {
          label: {
            text: 'Email',
            extraClass: 'reactive-label'
          },
          key: 'email',
          inputType: {
            name: 'input',
            extraClass: 'ui-inputtext'
          },
          validation: [
            Validators.required
          ],
          errors: {
            required: 'validator.required'
          },
        },
        {
          label: {
            text: 'Vai trò',
            extraClass: 'reactive-label'
          },
          key: 'role',
          inputType: {
            name: 'dropdown',
            placeholder: 'Chọn',
            data: [
              {value: 2, label: 'assistant'}
            ]
          },
          validation: [
            Validators.required
          ],
          errors: {
            required: 'validator.required'
          },
        }
      ]
    };
  }
}
