import { Validators } from '@angular/forms';

export class VideoForm {
  form;
  constructor(categories) {
    this.form = {
      form: {
        submitButton: {
          hidden: true,
          disabledInit: false, // default is false,
          extraClass: 'btn ui-button full-width pt-2 pb-2'
        },
        matchField: [],
      },
      config: [
        {
          label: {
            text: 'Tên video',
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
              path: 'pictures/videos',
              type: 'image'
            }
          },
          description: 'Chỉ được chọn 1 file',
          validation: [
            Validators.required
          ],
          errors: {
            required: 'validator.required'
          },
        },
        {
          label: {
            text: 'Danh mục',
            extraClass: 'reactive-label'
          },
          key: 'kind',
          inputType: {
            name: 'dropdown',
            data: categories,
            placeholder: 'Chọn'
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
            text: 'Source Video',
            extraClass: 'reactive-label'
          },
          key: 'source',
          description: 'Có thể chọn nhiều ảnh cho album',
          inputType: {
            name: 'mediapicker',
            options: {
              path: 'videos',
              type: 'video',
              iframe: true
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
          ],
          errors: {
          },
        }
      ]
    };
  }
}
