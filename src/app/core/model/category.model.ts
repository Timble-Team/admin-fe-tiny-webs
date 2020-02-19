export class Category {
  category: any;

  constructor(data) {
    this.category = {
      name: data.name,
      key: data.key,
      type: data.type,
      createdAt: new Date()
    };
  }
}

export enum CategoryTypeEnum {
  'Article',
  'Album',
  'Video',
  'Picture'
}
