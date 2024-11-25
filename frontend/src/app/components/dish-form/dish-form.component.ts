// src/app/components/dish-form/dish-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DishService, Dish } from '../../services/dish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class DishFormComponent implements OnInit {
  dish: Dish = {
    name: '',
    description: '',
    price: 0
  };
  isEdit: boolean = false;

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.dishService.getDish(+id).subscribe((data: Dish) => {
        this.dish = data;
      });
    }
  }

  saveDish() {
    if (this.isEdit) {
      this.dishService.updateDish(this.dish.id!, this.dish).subscribe(() => {
        this.router.navigate(['/gerente']);
        setTimeout(() => {
          alert('Prato atualizado com sucesso!');
        }, 1000)
      });
    } else {
      this.dishService.createDish(this.dish).subscribe(() => {
        this.router.navigate(['/gerente']);
        setTimeout(() => {
          alert('Prato resgitrado com sucesso!');
        }, 1000)
      });
    }
  }
}
