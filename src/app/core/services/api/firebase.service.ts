
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { PicturesService } from '../pictures.service';
import { LinkFormat } from 'app/shared/components/dialog/input-file-url/input-file-url.component';
import { map } from 'rxjs/operators';
export const API_BASE_URL = ``;

@Injectable()
export class FirebaseService {
  downloadUrls$ = new BehaviorSubject<any>([]);
  publicCond = [
    {
      key: 'public',
      compared: '==',
      value: true
    },
    {
      key: 'deletedAt',
      compared: '==',
      value: null
    }
  ];

  uploadProgressStorage$ =  new Observable<any>(null);

  constructor(
    private http: HttpClient,
    private pictureSv: PicturesService,
    private afStorage: AngularFireStorage,
    private firestore: AngularFirestore
  ) { }

  buildReference(collection, id) {
    return this.firestore.collection(collection).doc(id).ref;
  }

  convertRecord(res) {
    try {
      if (res.data()) {
        return {
          id: res.id,
          ...res.data()
        };
      }
    } catch (e) {
      const sum = [];
      res.forEach(doc => {
        sum.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return sum;
    }
  }

  createRecord(collection, data) {
    return  this.firestore
            .collection(collection)
            .add(data);
  }

  createRecordReference(collection, key, ref, data) {
    const refer = data;
    refer[key] = this.firestore.doc(ref).ref;
    return this.firestore
            .collection(collection)
            .add(refer);
  }

  getRecord(collection, id) {
    return this.firestore.collection(collection).doc(id).get().toPromise();
  }

  multipleCollection(arrCollection) {
    let tempRequest: any = this.firestore;
    arrCollection.forEach(x => {
      if (x.id) {
        tempRequest = tempRequest.collection(x.collection).doc(x.id);
      } else {
        tempRequest = tempRequest.collection(x.collection);
      }
    });
    return tempRequest;
  }

  createMultipleRecords(arrCollection, dataArray) {
    const tempRequest: any = this.multipleCollection(arrCollection).ref;
    const batch: any = this.firestore.firestore.batch();

    dataArray.forEach((doc) => {
      batch.set(tempRequest.doc(), doc);
    });
    return new Promise((resolve, reject) => {
      batch.commit().then((res) => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }

  /*
    condition: {key, compared, value}
    order: {key, by}
  */
  listRecords(collection, condition = null, order = null, limit = 7, lastIndex = null) {
    let request;
    if (condition) {
      if (condition.length) {
        request = this.firestore.collection(collection).ref;
        condition.forEach(x => {
          request = request.where(x.key, x.compared, x.value);
        });
      } else {
        request = this.firestore.collection(collection).ref.where(condition.key, condition.compared, condition.value);
      }
    } else {
      request = this.firestore.collection(collection).ref;
    }
    request = order ? request.orderBy(order.key, order.by) : request;
    request = lastIndex ? request.startAfter(lastIndex) : request;
    request = limit ? request.limit(limit) : request;
    return request.get();
  }

  listPublicRecords(collection, extraCondition = [], order = null, limit = 7, lastIndex = null) {
    const objCond = [...extraCondition, ...this.publicCond];
    return this.listRecords(collection, objCond, order, limit, lastIndex);
  }

  editRecord(collection, id, body) {
    return this.firestore
      .collection(collection)
      .doc(id)
      .set(body, { merge: true });
  }

  deleteRecord(collection, id) {
    return this.firestore
      .collection(collection)
      .doc(id)
      .delete();
  }

  addDownloadUrls(value) {
    const downloadUrls = this.downloadUrls$.value;
    if (typeof value === 'string') {
      downloadUrls.push(value);
      this.downloadUrls$.next(downloadUrls);
    } else if (Array.isArray(value)) {
      downloadUrls.push(...value);
      this.downloadUrls$.next(downloadUrls);
    }
  }

  resetDownloadUrls() {
    this.downloadUrls$.next([]);
  }

  deleteFileStorageAsync() {
    const downloadUrls = this.downloadUrls$.value;
    let tempUrls = this.downloadUrls$.value;
    downloadUrls.forEach(x => {
      const ref = this.afStorage.storage.refFromURL(x);
      ref.delete().then((res) => {
        console.log('remove file OK');
        tempUrls = tempUrls.filter(y => y !== x);
        this.downloadUrls$.next(tempUrls);
      }).catch((error) => {
        console.log(error);
        tempUrls = tempUrls.filter(y => y !== x);
        this.downloadUrls$.next(tempUrls);
      });
    });
  }

  deleteFileStorage(downloadUrls = []) {
    downloadUrls.forEach(x => {
      const ref = this.afStorage.storage.refFromURL(x);
      ref.delete().then((res) => {
        console.log('remove file OK');
        this.downloadUrls$.next(downloadUrls.filter(y => y !== x));
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  uploadFileStorage(data, keys: Array<string>, dataPath: string) {
    const finalLinks = [];
    const fileList = [];
    const dataRes = data;
    keys.forEach(x => {
      if (data[x]) {
        if (!Array.isArray(data[x])) {
          fileList.push({...data[x], key: x});
        } else {
          const dataObj = data[x].map((y, i) => {
            y.key = x;
            y.index = i;
            return y;
          });
          fileList.push(...dataObj);
        }
      }
    });
    console.log(fileList);
    return new Promise((resolve, reject) => {
      const totalSize = fileList.reduce((sum, x: any) => {
        sum += x.file ? x.file.size : 0;
        return sum;
      }, 0);
      const totalFile = fileList.filter(x => x.file).length;
      let transferSize = 0;
      fileList.forEach((fileObj: any) => {
        if (fileObj.file) {
          const file = fileObj.file;
          const path = file.name ?
            `${dataPath}/${Date.now()}_${Math.random().toString(36).substring(7)}_${file.name}` :
            `${dataPath}/${Date.now()}_${Math.random().toString(36).substring(7)}.${file.type.split('/')[1]}`;
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
                if (!Array.isArray(dataRes[fileObj.key])) {
                  dataRes[fileObj.key].url = downloadURL;
                  dataRes[fileObj.key] = {
                    url: downloadURL,
                    type: dataRes[fileObj.key].type,
                    size: dataRes[fileObj.key].size,
                  };
                } else {
                  dataRes[fileObj.key][fileObj.index] = {
                    url: downloadURL,
                    type: dataRes[fileObj.key][fileObj.index].type,
                    size: dataRes[fileObj.key][fileObj.index].size,
                  };
                }
                if (finalLinks.length === fileList.length) {
                  resolve(dataRes);
                }
              });
            } else {
              // error handling
              console.log(res);
              reject(res);
            }
          }).catch(e => {
            console.log('upload', e);
          });
          this.uploadProgressStorage$ = task.snapshotChanges().pipe(map((s: any) => {
            transferSize += s.bytesTransferred - lastbytesTransferred;
            lastbytesTransferred = s.bytesTransferred;
            return (+transferSize / +totalSize) * 100;
          }));
        } else {
          const link: LinkFormat = {
            url: fileObj.url,
            type: fileObj.type,
            size: fileObj.size
          };
          finalLinks.push(link);
          if (finalLinks.length === fileList.length) {
            resolve(dataRes);
          }
        }
      });
    });
  }

}

