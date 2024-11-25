import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getUrl } from './config/env';
import { User } from './user.service';

export interface OrderItem {
  id?: number;
  dishId: number;
  dishName: string;
  quantity: number;
  price: number;
}

export type OrderStatus = "PENDING" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";

export interface Order {
  id?: number;
  user: User;
  items?: OrderItem[];
  dishes: { id: number | undefined; name: string | undefined; price: number; quantity: number }[];
  totalAmount: number;
  status: OrderStatus;
  orderDate?: string;
  updatedAt?: Date;
  address: string;
  phone: string;
  paymentMethod: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = '';

  constructor(private http: HttpClient) {
    this.buildUrl();
  }

  buildUrl() {
    this.url = getUrl() + '/orders';
  }

  getOrders(email: string = ''): Observable<Order[]> {
    this.url += email == '' ? '' : `/by-email/${email}`;
    const res = this.http.get<Order[]>(this.url);
    this.buildUrl();
    return res;
  }

  getOrder(id: number, email:string = ''): Observable<Order> {
    this.url += email == '' ? `/${id}` : `/${id}/${email}`;
    const res = this.http.get<Order>(this.url);
    this.buildUrl();
    return res;
  }

  getLastOrder(email:string = ''): Observable<Order> {
    const res = this.http.get<Order>(`${this.url}/last-order/${email}`);
    this.buildUrl();
    return res;
  }

  createOrder(order: Order): Observable<Order> {
    const res = this.http.post<Order>(this.url, order);
    this.buildUrl();
    return res;
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    const res = this.http.put<Order>(`${this.url}/${id}`, order);
    this.buildUrl();
    return res;
  }

  updateOrderStatus(id: number, status: OrderStatus): Observable<Order> {
    const res = this.http.put<Order>(`${this.url}/${id}/status`, status );
    this.buildUrl();
    return res;
  }

  deleteOrder(id: number): Observable<Order> {
    const res = this.http.delete<Order>(`${this.url}/${id}`);
    this.buildUrl();
    return res;
  }

  // Método auxiliar para calcular o preço total do pedido
  calculateTotalPrice(items: OrderItem[]): number {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}