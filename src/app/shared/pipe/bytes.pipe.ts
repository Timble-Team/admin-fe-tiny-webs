import {DomSanitizer} from '@angular/platform-browser';
import {PipeTransform, Pipe} from '@angular/core';
import { format } from 'date-fns';


@Pipe({ name: 'fileSize'})
export class FileSizePipe implements PipeTransform  {
  private units = [
    'bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB'
  ];

  transform(bytes: number = 0, precision: number = 2 ): string {
    if (isNaN( parseFloat( String(bytes) )) || ! isFinite( bytes )) {
      return '?';
    }
    let unit = 0;
    while ( bytes >= 1024 ) {
      bytes /= 1024;
      unit ++;
    }
    return bytes.toFixed( + precision ) + ' ' + this.units[ unit ];
  }
}
