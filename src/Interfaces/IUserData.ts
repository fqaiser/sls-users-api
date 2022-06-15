export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface IUserData {
  data: IUser;
  support?: {
    url?: string;
    text?: string;
  };
}
