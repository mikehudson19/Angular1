import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../authenticate/IUser';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  userUrl: string = 'api/users';

  constructor(private _http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this._http.get<IUser[]>(this.userUrl).pipe()
  }

  getUser(id: number): Observable<IUser> {
    const url: string = `${this.userUrl}/${id}`
    return this._http.get<IUser>(url);
  }


}
