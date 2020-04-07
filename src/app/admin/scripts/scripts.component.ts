import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'app/core/services/api/firebase.service';

@Component({
  selector: 'app-scripts',
  templateUrl: './scripts.component.html',
})
export class ScriptsComponent {
  collections = [];
  currentLabel = '';
  data = '';

  constructor(private firebaseSv: FirebaseService) {
  }

  onSubmit () {
    this.collections.push({
      label: this.currentLabel
    });
    this.currentLabel = '';
  }

  createRecords() {
    let obj: any = {};
    const arr = [];
    this.collections.forEach((x: any, index) => {
      if (index % 2 === 0) {
        obj = {};
        obj.collection = x.label;
      }
      if (index % 2 !== 0) {
        obj.id = x.label;
      }
      if (index === this.collections.length - 1 || (obj.collection && obj.id)) {
        arr.push(obj);
      }
    });
    console.log(arr, JSON.parse(this.data));
    this.firebaseSv.createMultipleRecords(arr, JSON.parse(this.data)).then(res => {
      console.log(res);
    });
  }
}
