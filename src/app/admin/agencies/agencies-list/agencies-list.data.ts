import { Validators } from '@angular/forms';

export class AgencyForm {
  form = {
    form: {
      submitButton: {
        title: 'Thêm User vào đơn vị này',
        disabledInit: false, // default is false,
        extraClass: 'btn ui-button full-width pt-2 pb-2'
      },
      matchField: [],
    },
    config: [
      {
        label: 'Email',
        key: 'email',
        inputType: {
          name: 'input',
          type: 'text',
        },
        validation: [
          Validators.required
        ],
        errors: {
          required: 'validator.required'
        },
      },
      {
        label: 'Tên',
        key: 'name',
        inputType: {
          name: 'input',
          type: 'text',
        },
        validation: [
          Validators.required
        ],
        errors: {
          required: 'validator.required'
        },
      },
      {
        label: 'SDT',
        key: 'phone',
        inputType: {
          name: 'input',
          type: 'text',
        },
        validation: [
          Validators.required
        ],
        errors: {
          required: 'validator.required'
        },
      },
      {
        label: 'Ngày sinh',
        key: 'birthday',
        inputType: {
          name: 'input',
          type: 'text',
        },
        validation: [
        ],
        errors: {
        },
      },
      {
        key: 'adminType',
        inputType: {
          name: 'input',
          type: 'hidden',
        },
        value: 1,
        validation: [
          Validators.required
        ],
        errors: {
          required: 'validator.required'
        },
      },
      {
        key: 'agencyId',
        inputType: {
          name: 'input',
          type: 'hidden',
        },
        validation: [
          Validators.required
        ],
        errors: {
          required: 'validator.required'
        },
      },
      {
        label: 'Password',
        key: 'password',
        inputType: {
          name: 'input',
          type: 'password'
        },
        validation: [
          Validators.required
        ],
        errors: {
          required: 'validator.required'
        },
      },
    ]
  };
}
