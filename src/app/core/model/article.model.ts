export class Article {
  article: any;

  constructor(data) {
    this.article = {
      name: data.name,
      desc: data.desc,
      kind: data.kind,
      content: data.content,
      createdAt: new Date(),
      public: data.public,
      cover: data.cover,
      attachments: data.attachments,
      deletedAt: null
    };
  }
}
