import { Component } from '@angular/core';
import { Produto, ProdutosService } from '../../../../services/produtos.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {
  products: Produto[] = [];

  constructor(private produtoService: ProdutosService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.produtoService.getProdutos().subscribe((data: Produto[]) => {
      this.products = data;
    });
  }

  deleteProduct(id: number) {
    this.produtoService.deleteProduto(id).subscribe(() => {
      this.loadProducts();
      alert("Produto deletado com sucesso!")
    });
  }
}
