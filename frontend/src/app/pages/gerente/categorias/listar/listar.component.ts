import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoriasService, Category } from '../../../../services/categorias.service';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {
  categs: Category[] = [];

  constructor(private categService: CategoriasService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categService.getCategories().subscribe((data: Category[]) => {
      this.categs = data;
    });
  }

  deleteCategory(id: number) {
    this.categService.deleteCategory(id).subscribe(
      (response) => {
        console.log('Categoria excluída com sucesso');
        this.loadCategories();
      },
      (error) => {
        if(error.status == 200) {
          alert('Categoria excluída com sucesso');
          this.loadCategories();
        } else {
          alert(error.error);
          console.error('Erro ao excluir categoria:', error);
        }
      }
    );
  }
}
