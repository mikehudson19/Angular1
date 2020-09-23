import { IAdvert } from './IAdvert';

export class Advert implements IAdvert {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public listDate: Date,
    public price: number,
    public owner: number
  ) {}
}
