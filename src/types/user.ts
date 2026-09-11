export interface User {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface StoredAccount extends User {
  password: string;
}
