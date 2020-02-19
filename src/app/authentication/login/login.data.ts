import { Validators } from '@angular/forms';

export class LoginForm {
  form = {
    form: {
      submitButton: {
        disabledInit: false, // default is false,
        extraClass: 'btn ui-button full-width pt-2 pb-2',
        hidden: true
      },
      matchField: [],
    },
    config: [
      {
        label: {
          text: 'Username',
          extraClass: 'reactive-label'
        },
        key: 'email',
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
          text: 'Password',
          extraClass: 'reactive-label'
        },
        key: 'password',
        inputType: {
          name: 'input',
          type: 'password',
          extraClass: 'ui-inputtext'
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
