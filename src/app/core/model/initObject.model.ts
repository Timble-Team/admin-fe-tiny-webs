export class InitialObject {
  obj: any;

  constructor(data, keys) {
    const obj = {
      ...data,
      createdAt: new Date(),
      deletedAt: null
    };
    keys.forEach(x => {
      obj[x] = null;
    });
    this.obj = obj;
  }
}
