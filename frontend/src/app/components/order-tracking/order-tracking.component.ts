import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderService } from '../../services/order.service';
import { interval, Subscription, switchMap } from 'rxjs';
import { AuthenticateService } from '../../services/auth/authenticate.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class OrderTrackingComponent implements OnInit {
  orderId: number = 0;
  emailUser: string = '';
  orderDetails: Order | null = null;
  orderStatuses = [
    { step: 1, title: 'Pedido confirmado', description: 'Seu pedido foi recebido e confirmado.', completed: false },
    { step: 2, title: 'Preparando', description: 'Seu pedido está sendo preparado na cozinha.', completed: false },
    { step: 3, title: 'Saiu para entrega', description: 'Seu pedido está na rota para entrega.', completed: false },
    { step: 4, title: 'Entrega', description: 'Aproveite seu pedido.', completed: false }
  ];

  private updateSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private authService: AuthenticateService
  ) {
    this.emailUser = this.authService.getEmail() || '';
    this.getOrder(this.emailUser);
  }

  ngOnInit(): void {
    this.updateSubscription = interval(10000) // Atualiza a cada 10 segundos
      .pipe(switchMap(() => this.orderService.getOrder(this.orderId, this.emailUser)))
      .subscribe((order) => this.updateOrderStatus(order));
  }

  getOrder(email: string) {
    this.orderService.getLastOrder(email).subscribe((order) => {
      this.orderId = order.id || 0;
      this.updateOrderStatus(order)
    });
  }

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  private updateOrderStatus(order: Order): void {
    this.orderDetails = order;

    // Atualiza os estados com base no status atual do pedido
    const statusMap: { [key: string]: number } = {
      PENDING: 1,
      PREPARING: 2,
      READY: 3,
      DELIVERED: 4,
      CANCELLED: 0
    };

    const currentStep = statusMap[order.status] || 0;

    this.orderStatuses.forEach((status, index) => {
      status.completed = index < currentStep;
    });
  }

  getCurrentStatus(): string {
    if (!this.orderDetails) return 'Nenhum pedido encontrado';
    const currentStatus = this.orderStatuses.find(status => !status.completed);
    return currentStatus ? currentStatus.title : 'Entrega finalizada';
  }

  backToStore(): void {
    this.router.navigate(['/store']);
  }

  getEstimatedDeliveryTime(): string {
    const orderDate = new Date(this.orderDetails?.orderDate || '');
    orderDate.setMinutes(orderDate.getMinutes() + 60);
    orderDate.setSeconds(0, 0);
    return orderDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}