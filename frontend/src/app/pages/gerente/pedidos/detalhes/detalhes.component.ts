import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderService } from '../../../../services/order.service';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  providers: [DatePipe],
  imports: [CommonModule],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})
export class DetalhesComponent implements OnInit {
  orderDetails: Order | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getOrder(Number(id) || 0);
  }

  getOrder(id: number) {
    this.orderService.getOrder(id).subscribe((order) => {
      if (order) {
        this.orderDetails = order;
      } else {
        this.router.navigate(['/orders']);
      }
    });
  }

  backToHistory(): void {
    this.router.navigate(['/orders']);
  }
}
