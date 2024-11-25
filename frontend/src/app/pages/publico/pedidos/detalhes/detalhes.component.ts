import { Component, OnInit } from '@angular/core';
import { Order, OrderService } from '../../../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  templateUrl: './detalhes.component.html',
  providers: [DatePipe],
  imports: [CommonModule],
  styleUrls: ['./detalhes.component.css'],
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
        this.router.navigate(['/historico']);
      }
    });
  }

  backToHistory(): void {
    this.router.navigate(['/historico']);
  }
}
