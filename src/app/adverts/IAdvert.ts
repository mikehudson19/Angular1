import { User } from '../authenticate/user';

export interface IAdvert {
  id: number;
  title: string;
  description: string;
  listDate: Date;
  price: number;
  owner: number;
}