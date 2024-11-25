import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriasService, Category } from '../../../../services/categorias.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adicionar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './adicionar.component.html',
  styleUrl: './adicionar.component.css'
})
export class AdicionarComponent implements OnInit {
  categ: Category = {
    nome: ''
  }
  isEdit: boolean = false

  constructor(
    private categService: CategoriasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.categService.getCategory(+id).subscribe((data: Category) => {
        this.categ = data;
      });
    }
  }

  submit() {
    if (this.isEdit) {
      this.categService.updateCategory(this.categ.id!, this.categ).subscribe(() => {
          this.router.navigate(['/category']);
          setTimeout(() => {
            alert('Categoria atualizado com sucesso!');
          }, 1000);
        },
        (error) => {
          alert('Erro ao atualizar categoria')
          console.error('Erro ao atualizar categoria:', error);
        }
      );
    } else {
      this.categService.createCategory(this.categ).subscribe(() => {
          this.router.navigate(['/category']); 
          setTimeout(() => {
            alert('Categoria criado com sucesso!');
          }, 1000);
        },
        (error) => {
          alert('Erro ao criar categoria')
          console.error('Erro ao criar categoria:', error);
        }
      );
    }
  }
}
