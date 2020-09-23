import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IAdvert } from '../adverts/IAdvert';
import { User } from '../authenticate/user';

export class FakeBackEnd implements InMemoryDbService {
  createDb() {
    let users: User[] = [
      {
        id: 1,
        firstName: 'Alexander',
        lastName: 'Anderson',
        email: 'alex@gmail.com',
        password: 'Alex1!',
        confirmPass: 'Alex1!',
      },
      {
        id: 2,
        firstName: 'Leyla',
        lastName: 'Fisher',
        email: 'leyla@gmail.com',
        password: 'Leyla1!',
        confirmPass: 'Leyla1!',
      },
      {
        id: 3,
        firstName: 'Jasper',
        lastName: 'Rhodes',
        email: 'jasper@gmail.com',
        password: 'Jasper1!',
        confirmPass: 'Jasper1!',
      },
      {
        id: 4,
        firstName: 'Karla',
        lastName: 'Hart',
        email: 'karla@gmail.com',
        password: 'Karla1!',
        confirmPass: 'Karla1!',
      },
      {
        id: 5,
        firstName: 'Milo',
        lastName: 'Irwin',
        email: 'milo@gmail.com',
        password: 'Milo1!',
        confirmPass: 'Milo1!',
      },
    ];
    let adverts: IAdvert[] = [
      {
        id: 1,
        title: 'L-Shaped Couch',
        description: 'Almost brand new, excellent condition.',
        listDate: new Date('2020-08-21'),
        price: 1200,
        owner: 4,
      },
      {
        id: 2,
        title: 'Coffee Machine',
        description: 'Two years old. Unwanted birthday gift. Great condition.',
        listDate: new Date('2020-08-29'),
        price: 2200,
        owner: 4,
      },
      {
        id: 3,
        title: 'Mahogany Desk',
        description: 'Six years old, average condition. 120cm in length. Really heavy. Cash only.',
        listDate: new Date('2020-08-11'),
        price: 700,
        owner: 3,
      },
      {
        id: 4,
        title: 'Samsung Smart Fridge',
        description: 'Two years old. No longer smart as I broke it - but it still keeps your food cold. Cash only.',
        listDate: new Date('2020-07-22'),
        price: 1500,
        owner: 1,
      },
      {
        id: 5,
        title: 'Suzuki Quadbike',
        description: 'Suzuki King Quad 400cc 4x4. Brand new tyres. 4 stroke single cylinder electronic injection. Excellent Condition.',
        listDate: new Date('2020-09-11'),
        price: 1200,
        owner: 5,
      },
    ];
    
    return { users : users, adverts : adverts};

  }
}
