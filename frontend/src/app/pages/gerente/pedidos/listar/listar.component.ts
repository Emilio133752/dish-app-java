import { Component, OnInit } from '@angular/core';
import { Order, OrderService, OrderStatus } from '../../../../services/order.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { NgxCurrencyDirective } from 'ngx-currency';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule, ReactiveFormsModule, MatInputModule, NgxCurrencyDirective],
  providers: [DatePipe],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit {
  orders: Order[] = [];
  status: string[] = [
    'PENDING',
    'PREPARING',
    'READY',
    'DELIVERED',
    'CANCELLED'
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    this.orderService.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
      this.setStatusSelecionada()
    });
  }

  setStatusSelecionada() {
    this.orders.forEach(order => {
      // Se o status do pedido existir e for válido, mapeie para o status correspondente
      if (order.status && this.status.includes(order.status)) 
        order.status = order.status;
      else 
        order.status = 'PENDING'; 
    });
  }

  onStatusChange(order: Order, newStatus: OrderStatus) {
    order.status = newStatus;

    // Chama o serviço para atualizar o status no backend
    this.orderService.updateOrderStatus(order.id || 0, newStatus).subscribe(
      (updatedOrder) => {
        alert('Status atualizado com sucesso:');
      },
      (error) => {
        console.error('Erro ao atualizar o status:', error);
        alert('Erro ao atualizar o status do pedido. Tente novamente.');
      }
    );
  }
}
