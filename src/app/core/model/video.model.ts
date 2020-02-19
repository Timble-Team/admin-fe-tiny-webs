export class Video {
  video: any;

  constructor(data) {
    this.video = {
      name: data.name,
      cover: data.cover,
      desc: data.desc,
      kind: data.kind,
      source: data.source,
      createdAt: new Date(),
      deletedAt: null,
      public: data.public
    };
  }
}

