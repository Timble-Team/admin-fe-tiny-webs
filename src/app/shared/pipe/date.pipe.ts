import {DomSanitizer} from '@angular/platform-browser';
import {PipeTransform, Pipe} from '@angular/core';
import { format } from 'date-fns';


@Pipe({ name: 'dateTime'})
export class DateTimePipe implements PipeTransform  {
  transform(value, arg1 = 'dd-MM-yyyy', arg2) {
    if (value) {
      if (arg2 === 'timestamp') {
        return format(value.toDate(), arg1);
      } else {
        return format(value, arg1);
      }
    } else {
      return 'undefined';
    }
  }
}
