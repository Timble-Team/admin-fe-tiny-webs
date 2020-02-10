export interface Agency {
  name: string;
  desc: string;
  domain: string;
  avatar: string;
  phone: Number;
  address: string;
  public: Boolean;
  expireDate: Date;
  firebaseConfig?: Object;
  _id?: string;
}
