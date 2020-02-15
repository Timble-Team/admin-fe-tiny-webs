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
        label: {
          text: 'Tên bài viết',
          extraClass: 'reactive-label'
        },
        key: 'name',
        inputType: {
          name: 'input',
          type: 'text',
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
          text: 'Mô tả ngắn',
          extraClass: 'reactive-label'
        },
        key: 'desc',
        inputType: {
          name: 'textarea',
          extraClass: 'ui-inputtext ui-corner-all ui-inputtextarea-resizable ui-state-default ui-widget'
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
          text: 'Ảnh bìa',
          extraClass: 'reactive-label'
        },
        key: 'cover',
        inputType: {
          name: 'mediapicker',
          options: {
            path: 'pictures/articles'
          }
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
          text: 'Nội dung',
          extraClass: 'reactive-label'
        },
        key: 'content',
        inputType: {
          name: 'ckeditor',
          options: {
            path: 'pictures/articles'
          }
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
