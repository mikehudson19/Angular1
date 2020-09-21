import { InMemoryDbService } from 'angular-in-memory-web-api';
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
        confirmPass: 'Alex1!'
      },
      {
        id: 2,
        firstName: 'Leyla',
        lastName: 'Fisher',
        email: 'leyla@gmail.com',
        password: 'Leyla1!',
        confirmPass: 'Leyla1!'
      },
      {
        id: 3,
        firstName: 'Jasper',
        lastName: 'Rhodes',
        email: 'jasper@gmail.com',
        password: 'Jasper1!',
        confirmPass: 'Jasper1!'
      },
      {
        id: 4,
        firstName: 'Karla',
        lastName: 'Hart',
        email: 'karla@gmail.com',
        password: 'Karla1!',
        confirmPass: 'Karla1!'
      },
      {
        id: 5,
        firstName: 'Milo',
        lastName: 'Irwin',
        email: 'milo@gmail.com',
        password: 'Milo1!',
        confirmPass: 'Milo1!'
      },
    ]
    return { users : users };
  }
}