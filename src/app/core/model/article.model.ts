export class Article {
  article: any;

  constructor(data) {
    this.article = {
      name: data.name,
      desc: data.desc,
      content: data.content,
      createdAt: new Date(),
      public: data.public,
      cover: data.cover,
      deletedAt: null
    };
  }
}
