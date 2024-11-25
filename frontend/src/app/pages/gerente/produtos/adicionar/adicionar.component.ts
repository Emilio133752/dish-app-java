import { Component, OnInit } from '@angular/core';
import { Produto, ProdutosService } from '../../../../services/produtos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriasService, Category } from '../../../../services/categorias.service';
import { MatInputModule } from '@angular/material/input';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-adicionar',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, CommonModule, MatInputModule, NgxCurrencyDirective ],
  templateUrl: './adicionar.component.html',
  styleUrl: './adicionar.component.css'
})
export class AdicionarComponent implements OnInit {
  produto: Produto = {
    nome: '',
    descricao: '',
    preco: 0,
    categoria: null
  }
  selectedPreco: string = '';
  categs: Category[] = [];
  isEdit: boolean = false

  constructor(
    private produtoService: ProdutosService,
    private categService: CategoriasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.produtoService.getProduto(+id).subscribe((data: Produto) => {
        this.produto = data;

        this.selectedPreco = this.produto.preco.toString();
  
        this.loadCategories(() => {
          this.setCategoriaSelecionada();
        });
      });
    } else {
      this.loadCategories();
    }
  }

  insertValueInModel(value?: any) {
    value = value.replace(/[^\d,]+/g, '').replace(',', '.');
    this.produto.preco = parseFloat(value);
  }

  loadCategories(callback?: () => void) {
    this.categService.getCategories().subscribe((data: Category[]) => {
      this.categs = data;
  
      if (callback) {
        callback();
      }
    });
  }

  setCategoriaSelecionada() {
    if (this.produto.categoria && this.produto.categoria.id) {
      this.produto.categoria = this.categs.find(
        (categ) => categ.id === this.produto.categoria?.id
      ) || null; 
    }
  }

  submit() {
    if(!this.produto.categoria || this.produto.categoria.id === null || this.produto.categoria.id === 0 || this.produto.categoria.id === undefined) {
      alert('É necessário informar uma categoia!');
      return
    }

    const preco = document.querySelector('#preco') as HTMLInputElement;
    this.insertValueInModel(preco.value);
  
  // Verifica se o preco foi atualizado corretamente
    console.log(this.produto.preco);
    
    if (this.isEdit) {
      this.produtoService.updateProduto(this.produto.id!, this.produto).subscribe(() => {
          this.router.navigate(['/products']);
          setTimeout(() => {
            alert('Produto atualizado com sucesso!');
          }, 1000);
        },
        (error) => {
          alert('Erro ao atualizar produto')
          console.error('Erro ao atualizar produto:', error);
        }
      );
    } else {
      this.produtoService.createProduto(this.produto).subscribe(() => {
          this.router.navigate(['/products']); 
          setTimeout(() => {
            alert('Produto criado com sucesso!');
          }, 1000);
        },
        (error) => {
          alert('Erro ao criar produto')
          console.error('Erro ao criar produto:', error);
        }
      );
    }
  }

  get precoFormatted(): string {
    return this.formatarMoeda(this.produto.preco);
  }

  set precoFormatted(valor: string) {
    this.produto.preco = this.desformatarMoeda(valor);
  }

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  desformatarMoeda(valor: string): number {
    const numero = valor.replace(/[^\d,-]+/g, '').replace(',', '.');
    return parseFloat(numero);
  }
}
