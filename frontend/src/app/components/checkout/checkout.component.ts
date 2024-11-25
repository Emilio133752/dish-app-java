// src/app/components/checkout/checkout.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Dish } from '../../services/dish.service';
import { Order, OrderService } from '../../services/order.service';
import { ObserversModule } from '@angular/cdk/observers';
import { AuthenticateService } from '../../services/auth/authenticate.service';

interface CartItem extends Dish {
  quantity: number;
}

interface OrderInfo {
  customerName: string;
  address: string;
  phone: string;
  paymentMethod: 'dinheiro' | 'credito' | 'debito';
  note: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalAmount: number = 0;
  
  orderInfo: OrderInfo = {
    customerName: '',
    address: '',
    phone: '',
    paymentMethod: 'credito',
    note: ''
  };

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthenticateService
  ) {}

  ngOnInit(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart).map((item: any) => ({
        id: item.id,
        name: item.name, // Adiciona o nome se estiver ausente
        price: item.price, // Adiciona o preço se estiver ausente
        quantity: item.quantity,
      }));
      this.orderInfo.customerName = this.authService.getName() || '';
      this.orderInfo.phone = this.authService.getPhone() || '';
      this.calculateTotal();
    } else {
      // Se não houver itens no carrinho, redirecionar para a loja
      this.router.navigate(['/store']);
    }
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  confirmOrder(): void {
    // Redireciona para a página de login se não estiver autenticado
    if (!this.authService.isAuthenticated()) { 
      this.router.navigate(['/login']); 
      return;
    }

    const user = this.authService.getEmail() || '';
    
    const order: Order = { 
      user: { id: 0, email: user },
      dishes: this.cartItems.map(item => ({
        id: item.id,
        name: item.name || 'Unknown Dish', // Forneça um valor padrão
        price: item.price || 0,            // Forneça um valor padrão
        quantity: item.quantity
      })),
      totalAmount: this.totalAmount,
      status: 'PENDING',
      orderDate: new Date().toISOString(),
      address: this.orderInfo.address,
      phone: this.orderInfo.phone,
      paymentMethod: this.orderInfo.paymentMethod
    };

    console.log(order);
    
    this.orderService.createOrder(order).subscribe((data) => {
      alert('Pedido gerado com sucesso!');
      localStorage.removeItem('cart');
      localStorage.removeItem('order');
      localStorage.setItem('order', JSON.stringify(data));
      this.router.navigate(['/pedido']); 
    },
    (error) => {
        alert('Erro ao gerar pedido')
        console.error('Erro ao gerar pedido:', error);
      }
    );
  }

  goBackToStore(): void {
    this.router.navigate(['/']);
  }
}