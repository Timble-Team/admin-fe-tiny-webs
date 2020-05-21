import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { Observable, of, forkJoin } from 'rxjs';
import { FileUpload } from 'primeng/fileupload';
import patterns from '../../../pattern/pattern';
import { PicturesService } from 'app/core/services/pictures.service';
import { FirebaseService } from 'app/core/services/api/firebase.service';

export interface LinkFormat {
  url: string;
  type: string;
  size: number;
  file?: Blob;
  iframe?: string;
}

@Component({
  selector: 'input-file-url',
  templateUrl: './input-file-url.component.html'
})

export class InputFileUrlComponent implements OnInit {

  uploadedFiles: any[] = [];
  storageRef: AngularFireStorageReference;
  uploadProgress: any;
  downloadURL = new Observable<any>(null);
  task: any;
  links: LinkFormat[] = [];
  linksIframe = [];
  files = [];
  typeChoosen: any;
  currentLink: any;
  currentIframeLink: any;
  disabledSave: boolean;
  errorLink: boolean;
  errorIframeLink: boolean;
  domainRegex = patterns.domain;
  @ViewChild(FileUpload, {static: false}) fileComp: FileUpload;

  constructor(
    public ref: DynamicDialogRef,
    private picturesSv: PicturesService,
    private firebase: FirebaseService,
    public config: DynamicDialogConfig,
    private pictureSv: PicturesService,
    private messageService: MessageService,
    private afStorage: AngularFireStorage) {}

  onSelectFile($event) {
    if (!this.config.data.multiple) {
      this.links = [];
      this.linksIframe = [];
      this.files.push(...$event.files);
    } else {
      // this.files.push();
      for (const file of $event.files) {
        this.files.push(file);
      }
    }
  }

  onRemoveFile(event) {
    this.files = this.files.filter(x => x !== event.file);
  }

  ngOnInit() {
    this.typeChoosen = this.config.data.type ? this.config.data.type.split(',').map(x => `${x}/*`).join(',') : false;
    console.log(this.config);
  }

  waitUploader() {
    this.disabledSave = true;
    const totalSize = this.files.reduce((sum, x) => {
      sum += x.size;
      return sum;
    }, 0);
    const finalLinks = [...this.links, ...this.linksIframe];
    if (this.files.length > 0) {
      this.files.forEach(file => {
        if (file.type.match(/^image\//)) {
          this.picturesSv.compressImageFile(file).then((compressImageObj: any) => {
            const link: LinkFormat = {
              url: compressImageObj.url,
              type: 'image',
              size: compressImageObj.file.size,
              file: compressImageObj.file
            };
            finalLinks.push(link);
            if ((finalLinks.length - this.links.length) === this.files.length) {
              // tslint:disable-next-line:max-line-length
              this.messageService.add({severity: 'info', summary: 'Hoàn tất up ảnh', detail: `${finalLinks.length} file(s) đã được import!`});
              this.ref.close(finalLinks);
            }
          });
        } else {
          const link: LinkFormat = {
            url: URL.createObjectURL(file),
            type: this.pictureSv.checkFileExtension(file.type),
            size: file.size,
            file: file
          };
          finalLinks.push(link);
          if ((finalLinks.length - this.links.length) === this.files.length) {
            // tslint:disable-next-line:max-line-length
            this.messageService.add({severity: 'info', summary: 'Hoàn tất up file', detail: `${finalLinks.length} file(s) đã được import!`});
            this.ref.close(finalLinks);
          }
        }
      });
    } else {
      this.ref.close(finalLinks);
    }
  }

  myUploader() {
    this.disabledSave = true;
    const finalLinks = [...this.links];
    if (this.files.length > 0) {
      const filesAsync = this.files.map(file => {
        if (file.type.match(/^image\//)) {
          return this.picturesSv.compressImageFile(file);
        } else {
          return of({file});
        }
      });
      forkJoin(filesAsync).subscribe(fileList => {
        const totalSize = fileList.reduce((sum, x: any) => {
          sum += x.file.size;
          return sum;
        }, 0);
        let transferSize = 0;
        fileList.forEach((fileObj: any) => {
          const file = fileObj.file;
          const path = file.name ?
            `${this.config.data.path}/${Date.now()}_${file.name}` :
            `${this.config.data.path}/${Date.now()}.${file.type.split('/')[1]}`;
          const ref = this.afStorage.ref(path);
          let lastbytesTransferred = 0;
          const task = this.afStorage.upload(path, file);
          const fileType = this.pictureSv.checkFileExtension(file.type);
          task.then(res => {
            if (res.state === 'success') {
              ref.getDownloadURL().subscribe((downloadURL) => {
                const link: LinkFormat = {
                  url: downloadURL,
                  type: fileType,
                  size: file.size
                };
                finalLinks.push(link);
                if (this.fileComp.progress === 100 && (finalLinks.length - this.links.length) === this.files.length) {
                  // tslint:disable-next-line:max-line-length
                  this.messageService.add({severity: 'info', summary: 'Hoàn tất up ảnh', detail: `${finalLinks.length} file(s) đã được import!`});
                  this.ref.close(finalLinks);
                }
              });
            } else {
              // error handling
              console.log(res);
              this.disabledSave = false;
            }
          });
          const uploadProgress = task.snapshotChanges().pipe(map((s: any) => {
            transferSize += s.bytesTransferred - lastbytesTransferred;
            lastbytesTransferred = s.bytesTransferred;
            return (+transferSize / +totalSize) * 100;
          }));
          uploadProgress.subscribe(data => {
            this.fileComp.progress = data;
          });
        });
      });
    } else {
      this.ref.close(finalLinks);
    }
  }

  addLink() {
    this.pictureSv.checkTypeFile(this.currentLink).then((res: any) => {
      if (!this.config.data.type || this.config.data.type.indexOf(res.type) !== -1) {
        const link: LinkFormat = {
          url: this.currentLink,
          type: res.type,
          size: 0
        };
        this.addUrlLink(link);
        this.errorLink = false;
      } else {
        this.errorLink = true;
      }
    }).catch(e => {
      console.log(e);
      this.errorLink = true;
    });
  }

  addIframe() {
    let iframeType;
    if (this.currentIframeLink.indexOf('facebook.com') !== -1) {
      iframeType = 'facebook';
    }
    if (this.currentIframeLink.indexOf('youtube.com') !== -1) {
      iframeType = 'youtube';
    }
    if (this.currentIframeLink.indexOf('google.com') !== -1) {
      iframeType = 'google';
    }
    if (this.currentIframeLink.indexOf('vimeo.com') !== -1) {
      iframeType = 'vimeo';
    }
    const link: LinkFormat = {
      url: this.currentIframeLink,
      type: 'video',
      iframe: iframeType,
      size: 0
    };
    this.addUrlIframe(link);
    this.errorIframeLink = false;
  }

  removeLink(i) {
    this.links.splice(i, 1);
  }

  addUrlLink(link) {
    if (!this.config.data.multiple) {
      if (this.links.length === 0) {
        this.links.push(link);
        this.currentLink = null;
        this.files = [];
        this.linksIframe = [];
      }
    } else {
      this.links.push(link);
      this.currentLink = null;
    }
  }

  addUrlIframe(link) {
    if (!this.config.data.multiple) {
      if (this.linksIframe.length === 0) {
        this.linksIframe.push(link);
        this.currentIframeLink = null;
        this.files = [];
        this.links = [];
      }
    } else {
      this.linksIframe.push(link);
      this.currentIframeLink = null;
    }
  }
}
