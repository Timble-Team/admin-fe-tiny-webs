import { Validators } from '@angular/forms';

export class AgencyForm {
  form = {
    form: {
      submitButton: {
        title: 'Tạo',
        disabledInit: false, // default is false,
        extraClass: 'btn ui-button full-width pt-2 pb-2'
      },
      matchField: [],
    },
    config: [
      {
        label: 'Tên đơn vị',
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
        label: 'Mô tả đơn vị',
        key: 'desc',
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
        label: 'Domain đơn vị',
        key: 'domain',
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
        label: 'SDT đơn vị',
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
        label: 'Địa chỉ đơn vị',
        key: 'address',
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
        label: 'Firebase đơn vị',
        key: 'firebaseConfig',
        inputType: {
          name: 'input',
          type: 'text'
        },
        validation: [
          Validators.required
        ],
        errors: {
          required: 'validator.required'
        },
      },
      {
        label: 'Public',
        key: 'public',
        inputType: {
          name: 'radio',
          data: [
            {
              text: 'OFF',
              value: false
            },
            {
              text: 'ON',
              value: true
            }
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
