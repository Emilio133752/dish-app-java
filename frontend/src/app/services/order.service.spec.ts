import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService, Order, OrderItem } from './order.service';
import { getUrl } from './config/env';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;
  const url = getUrl() + '/orders';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService]
    });
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const mockOrder: Order = {
    id: 1,
    items: [
      {
        id: 1,
        dishId: 1,
        dishName: 'Prato 1',
        quantity: 2,
        price: 25.90
      }
    ],
    totalPrice: 51.80,
    status: 'PENDING',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  it('should get all orders', () => {
    service.getOrders().subscribe(orders => {
      expect(orders).toEqual([mockOrder]);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush([mockOrder]);
  });

  it('should get a single order', () => {
    service.getOrder(1).subscribe(order => {
      expect(order).toEqual(mockOrder);
    });

    const req = httpMock.expectOne(url + '/orders/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockOrder);
  });

  it('should create a new order', () => {
    const newOrder: Order = {
      items: mockOrder.items,
      totalPrice: mockOrder.totalPrice,
      status: 'PENDING'
    };

    service.createOrder(newOrder).subscribe(order => {
      expect(order).toEqual(mockOrder);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newOrder);
    req.flush(mockOrder);
  });

  it('should update an order', () => {
    const updatedOrder: Order = {
      ...mockOrder,
      status: 'PREPARING'
    };

    service.updateOrder(1, updatedOrder).subscribe(order => {
      expect(order).toEqual(updatedOrder);
    });

    const req = httpMock.expectOne(url + '/orders/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedOrder);
    req.flush(updatedOrder);
  });

  it('should update order status', () => {
    const newStatus = 'DELIVERED' as const;
    const updatedOrder = { ...mockOrder, status: newStatus };

    service.updateOrderStatus(1, newStatus).subscribe(order => {
      expect(order).toEqual(updatedOrder);
    });

    const req = httpMock.expectOne(url + '/orders/1/status');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ status: newStatus });
    req.flush(updatedOrder);
  });

  it('should delete an order', () => {
    service.deleteOrder(1).subscribe(order => {
      expect(order).toEqual(mockOrder);
    });

    const req = httpMock.expectOne(url + '/orders/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(mockOrder);
  });

  it('should calculate total price correctly', () => {
    const items: OrderItem[] = [
      { dishId: 1, dishName: 'Prato 1', quantity: 2, price: 25.90 },
      { dishId: 2, dishName: 'Prato 2', quantity: 1, price: 32.90 }
    ];

    const total = service.calculateTotalPrice(items);
    expect(total).toBe(84.70);
  });
});