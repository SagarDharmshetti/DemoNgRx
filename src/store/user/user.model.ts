export interface User {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  id: number;
}
export interface UserState {
  users: User[];
}
