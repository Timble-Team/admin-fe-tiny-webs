import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'input-file-url',
  templateUrl: './input-file-url.component.html'
})

export class InputFileUrlComponent {

  uploadedFiles: any[] = [];
  storageRef: AngularFireStorageReference;
  uploadProgress: any;
  downloadURL = new Observable<any>(null);
  task: any;
  links = [];
  link: any;
  @ViewChild(FileUpload, {static: false}) fileComp: FileUpload;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    private afStorage: AngularFireStorage) {}

  ngOnInit() {
    this.doesFileExist();
  }

  myUploader(event) {
    const [file] = event.files;
    const path = `${this.config.data.path}/${Date.now()}_${file.name}`;
    const ref = this.afStorage.ref(path);
    this.task = this.afStorage.upload(path, file);
    this.task.then(res => {
      if (res.state === 'success') {
        ref.getDownloadURL().subscribe((downloadURL) => {
          this.messageService.add({severity: 'info', summary: 'Hoàn tất up ảnh', detail: res.metadata.name});
          this.ref.close(downloadURL);
        });
      } else {
        // error handling
      }
    });
    this.uploadProgress = this.task.snapshotChanges().pipe(map((s: any) => (s.bytesTransferred / s.totalBytes) * 100));
    this.uploadProgress.subscribe(data => {
      this.fileComp.progress = data;
    });
  }

  addLink() {
    this.links.push(this.link);
    this.link = null;
  }

  removeLink(i) {
    this.links.splice(i, 1);
  }

  doesFileExist(urlToFile = 'https://css-tricks.com/wp-content/uploads/2015/02/cover-and-contain.jpg') {
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
    console.log(xhr);
    if (+xhr.status === 404) {
        return false;
    } else {
        return true;
    }
}
}
