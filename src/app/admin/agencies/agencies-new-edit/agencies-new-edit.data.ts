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
        label: {
          text: 'Tên đơn vị',
          extraClass: 'reactive-label'
        },
        key: 'name',
        inputType: {
          name: 'input',
          type: 'text',
          extraClass: 'ui-inputtext'
        },
        validation: [
          Validators.required,
          Validators.minLength(5)
        ],
        errors: {
          required: 'Trường này là bắt buộc',
          minlength: 'Độ dài tối thiểu là 5 kí tự'
        },
      },
      {
        label: {
          text: 'Mô tả đơn vị',
          extraClass: 'reactive-label'
        },
        key: 'desc',
        inputType: {
          name: 'textarea',
          type: 'text',
          extraClass: 'ui-inputtext ui-corner-all ui-inputtextarea-resizable ui-state-default ui-widget'
        },
        validation: [
          Validators.required
        ],
        errors: {
          required: 'Trường này là bắt buộc'
        },
      },
      {
        label: {
          text: 'Domain đơn vị',
          extraClass: 'reactive-label'
        },
        key: 'domain',
        inputType: {
          name: 'input',
          type: 'text',
          extraClass: 'ui-inputtext'
        },
        validation: [
          Validators.required
        ],
        errors: {
          required: 'Trường này là bắt buộc'
        },
      },
      {
        label: {
          text: 'SDT đơn vị',
          extraClass: 'reactive-label'
        },
        key: 'phone',
        inputType: {
          name: 'input',
          type: 'text',
          extraClass: 'ui-inputtext'
        },
        validation: [
          Validators.required
        ],
        errors: {
          required: 'Trường này là bắt buộc'
        },
      },
      {
        label: {
          text: 'Địa chỉ đơn vị',
          extraClass: 'reactive-label'
        },
        key: 'address',
        inputType: {
          name: 'input',
          type: 'text',
          extraClass: 'ui-inputtext'
        },
        validation: [
          Validators.required
        ],
        errors: {
          required: 'Trường này là bắt buộc'
        },
      },
      {
        label: {
          text: 'Firebase đơn vị',
          extraClass: 'reactive-label'
        },
        key: 'firebaseConfig',
        inputType: {
          name: 'input',
          type: 'text',
          extraClass: 'ui-inputtext'
        },
        validation: [
          Validators.required
        ],
        errors: {
          required: 'Trường này là bắt buộc'
        },
      },
      {
        label: {
          text: 'Public',
          extraClass: 'reactive-label'
        },
        key: 'public',
        inputType: {
          name: 'switcher'
        },
        validation: [
          Validators.required
        ],
        errors: {
          required: 'Trường này là bắt buộc'
        },
      }
    ]
  };
}
