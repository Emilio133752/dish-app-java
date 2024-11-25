// src/app/services/dish.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getUrl } from './config/env';

export interface Dish {
  id?: number;
  name: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private url = getUrl() + '/dishes';

  constructor(private http: HttpClient) {}

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.url);
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(`${this.url}/${id}`);
  }

  createDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.url, dish);
  }

  updateDish(id: number, dish: Dish): Observable<Dish> {
    return this.http.put<Dish>(`${this.url}/${id}`, dish);
  }

  deleteDish(id: number): Observable<Dish> {
    return this.http.delete<Dish>(`${this.url}/${id}`);
  }
}
