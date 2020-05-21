import { Validators } from '@angular/forms';
import { calcEnumTypeString } from 'app/shared/common';
import { CategoryTypeEnum } from 'app/core/model/category.model';

export class CategoryForm {
  form = {};

  generateForm(categoriesList = []) {
    this.form = {
      form: {
        submitButton: {
          title: 'Tạo / Sửa danh mục',
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
            text: 'Loại danh mục',
            extraClass: 'reactive-label'
          },
          key: 'type',
          inputType: {
            name: 'select',
            extraClass: 'ui-inputtext',
            data: categoriesList
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
            text: 'Tên danh mục',
            extraClass: 'reactive-label'
          },
          key: 'name',
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
            text: 'Khóa danh mục',
            extraClass: 'reactive-label'
          },
          key: 'key',
          inputType: {
            name: 'input',
            type: 'number',
            extraClass: 'ui-inputtext'
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
