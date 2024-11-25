import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { NgxCurrencyDirective } from 'ngx-currency';
import { Order, OrderService, OrderStatus } from '../../../../services/order.service';
import { AuthenticateService } from '../../../../services/auth/authenticate.service';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule, ReactiveFormsModule, MatInputModule, NgxCurrencyDirective],
  providers: [DatePipe],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit {
  isEmptyOrder: boolean = false;
  orders: Order[] = [];

  constructor(private orderService: OrderService, private authService: AuthenticateService) {}

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    this.orderService.getOrders(this.authService.getEmail() || '').subscribe((data: Order[]) => {
      this.orders = data;
      this.isEmptyOrder = this.orders.length === 0;
    });
  }
}