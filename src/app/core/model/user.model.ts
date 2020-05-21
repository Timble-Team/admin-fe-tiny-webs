export class User {
  user: any;

  constructor(data) {
    this.user = {
      displayName: data.displayName,
      email: data.email,
      provider: data.provider || 'google.com',
      photoURL: data.photoURL
      // createdAt: new Date(),
      // deletedAt: null
    };
  }
}

