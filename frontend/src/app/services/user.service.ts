import { Injectable } from '@angular/core';
import { getUrl } from './config/env';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum Roles {
  gerente    = 'gerente', 
  cliente    = 'cliente', 
  entregador = 'entregador'
}

export interface User {
  id?: number;
  name?: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  role?: Roles;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = getUrl() + '/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  createUser(user: User): Observable<any> {
    return this.http.post<any>(this.url, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.url}/${id}`);
  }
}
