import { Injectable } from '@angular/core';
import { getUrl } from './config/env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './categorias.service';

export interface Produto {
  id?:number
  nome: string
  descricao?: string
  preco: number
  categoria: Category | null
}

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private url = getUrl() + '/produtos';

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url);
  }

  getProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.url}/${id}`);
  }

  createProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.url, produto);
  }

  updateProduto(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(this.url, produto);
  }

  deleteProduto(id: number): Observable<Produto> {
    return this.http.delete<Produto>(`${this.url}/${id}`);
  }
}
