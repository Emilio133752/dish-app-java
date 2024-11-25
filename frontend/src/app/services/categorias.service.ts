import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getUrl } from './config/env';

export interface Category {
  id?: number,
  nome: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private url = getUrl() + '/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.url}/${id}`);
  }

  createCategory(categ: Category): Observable<Category> {
    return this.http.post<Category>(this.url, categ);
  }

  updateCategory(id: number, categ: Category): Observable<Category> {
    return this.http.put<Category>(`${this.url}/${id}`, categ);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(`${this.url}/${id}`);
  }
}
