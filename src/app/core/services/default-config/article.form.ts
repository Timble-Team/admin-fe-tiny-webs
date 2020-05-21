import { FormConfig } from 'app/admin/admin.form';

export const articleFormData = (kindList = []): FormConfig[] => ([
  {
    labelName: 'Tên bài viết',
    inputName: 'input',
    key: 'name',
    inputType: 'text',
    validator: [
      {
        type: 'required'
      }
    ],
    mainLabel: true
  },
  {
    labelName: 'Mô tả ngắn',
    inputName: 'textarea',
    key: 'desc',
    validator: [
      {
        type: 'required'
      }
    ],
    mainLabel: true
  },
  {
    labelName: 'Ảnh bìa',
    inputName: 'mediapicker',
    key: 'cover',
    options: {
      path: 'pictures/articles',
      type: 'image'
    },
    validator: [
      {
        type: 'required'
      }
    ]
  },
  {
    labelName: 'Danh mục',
    inputName: 'dropdown',
    key: 'kind',
    validator: [
      {
        type: 'required'
      }
    ],
    initValue: kindList,
    mainLabel: true
  },
  {
    labelName: 'Nội dung',
    inputName: 'ckeditor',
    key: 'content',
    validator: [
      {
        type: 'required'
      }
    ],
    options: {
      path: 'pictures/articles',
      type: 'image',
      uploadNow: true
    },
    initValue: []
  },
  {
    labelName: 'File đính kèm',
    inputName: 'mediapicker',
    key: 'attachments',
    validator: [
      {
        type: 'required'
      }
    ],
    options: {
      path: 'pictures/articles',
      multiple: true
    }
  },
  {
    labelName: 'Public',
    inputName: 'switcher',
    key: 'public',
    mainLabel: true
  }
]);
