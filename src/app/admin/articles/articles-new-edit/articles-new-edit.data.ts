import { Validators } from '@angular/forms';

export class ArticleForm {
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
        label: 'Tên bài viết',
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
        label: 'Mô tả',
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
        label: 'Nội dung',
        key: 'content',
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
        label: 'Ảnh bìa',
        key: 'cover',
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
