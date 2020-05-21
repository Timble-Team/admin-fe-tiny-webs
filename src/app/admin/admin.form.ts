import { Validators } from '@angular/forms';

export interface FormValidator {
  type: string;
  value?: string;
}

export interface FormConfig {
  labelName: any;
  inputName: string;
  key: string;
  inputType?: string;
  validator?: FormValidator[];
  options?: any;
  initValue?: any;
  placeholder?: string;
  mainLabel?: boolean;
}

const validatorList = {
  required: {
    message: 'validator.required',
    func: () => Validators.required
  },
  minLength: {
    message: 'minLength',
    func: (x) => Validators.minLength(x),
  },
  maxLength: {
    message: 'minLength',
    func: (x) => Validators.maxLength(x),
  },
};

export class AdminForm {
  config: any;

  constructor(configs: FormConfig[]) {
    this.config = {
      form: {
        submitButton: {
          hidden: true,
          disabledInit: false, // default is false,
          extraClass: 'btn ui-button full-width pt-2 pb-2'
        },
        matchField: [],
      },
      config: this.generateForm(configs)
    };
  }

  generateForm(configs) {
    const form = [];
    configs.forEach((x: FormConfig, index) => {
      switch (x.inputName) {
        case 'input':
          form[index] = this.generateInput(x);
          break;
        case 'textarea':
          form[index] = this.generateTextArea(x);
          break;
        case 'dropdown':
          form[index] = this.generateDropdown(x);
          break;
        case 'mediapicker':
          form[index] = this.generateMediaPicker(x);
          break;
        case 'switcher':
          form[index] = this.generateSwitcher(x);
          break;
        case 'ckeditor':
          form[index] = this.generateCkEditor(x);
          break;
        default:
          form[index] = this.generateInput(x);
      }
    });
    return form;
  }

  generateInput(data: FormConfig) {
    return {
      label: {
        text: data.labelName,
        extraClass: 'reactive-label'
      },
      key: data.key,
      inputType: {
        name: data.inputName,
        type: data.inputType,
        extraClass: 'ui-inputtext'
      },
      ...this.generateValidator(data.validator)
    };
  }

  generateTextArea(data: FormConfig) {
    return {
      label: {
        text: data.labelName,
        extraClass: 'reactive-label'
      },
      key: data.key,
      inputType: {
        name: data.inputName,
        extraClass: 'ui-inputtext ui-corner-all ui-inputtextarea-resizable ui-state-default ui-widget'
      },
      ...this.generateValidator(data.validator)
    };
  }

  generateDropdown(data: FormConfig) {
    return {
      label: {
        text: data.labelName,
        extraClass: 'reactive-label'
      },
      key: data.key,
      inputType: {
        name: data.inputName,
        data: data.initValue ? data.initValue : [],
        placeholder: data.placeholder ? data.placeholder : 'Chọn'
      },
      ...this.generateValidator(data.validator)
    };
  }

  generateMediaPicker(data: FormConfig) {
    return {
      label: {
        text: data.labelName,
        extraClass: 'reactive-label'
      },
      key: data.key,
      inputType: {
        name: data.inputName,
        options: data.options
      },
      ...this.generateValidator(data.validator)
    };
  }

  generateSwitcher(data: FormConfig) {
    return {
      label: {
        text: data.labelName,
        extraClass: 'reactive-label'
      },
      key: data.key,
      inputType: {
        name: data.inputName
      },
      ...this.generateValidator(data.validator)
    };
  }

  generateCkEditor(data: FormConfig) {
    return {
      label: {
        text: data.labelName,
        extraClass: 'reactive-label'
      },
      key: data.key,
      inputType: {
        name: data.inputName,
        options: data.options
      },
      ...this.generateValidator(data.validator)
    };
  }

  generateValidator(validations: FormValidator[]) {
    const validateObj = {
      validation: [],
      errors: {}
    };
    if (validations) {
      validations.forEach((x, index) => {
        if (!x.value) {
          validateObj.validation.push(validatorList[x.type].func());
          validateObj.errors[x.type] = validatorList[x.type].message;
        } else {
          validateObj.validation.push(validatorList[x.type].func(x.value));
          validateObj.errors[x.type] = validatorList[x.type].message;
        }
      });
    }
    return validateObj;
  }
}
