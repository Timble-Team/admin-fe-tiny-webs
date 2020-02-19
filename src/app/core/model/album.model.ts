export class Album {
  album: any;

  constructor(data) {
    this.album = {
      name: data.name,
      cover: data.cover,
      desc: data.desc,
      photos: data.photos,
      kind: data.kind,
      createdAt: new Date(),
      deletedAt: null,
      public: data.public
    };
  }
}

