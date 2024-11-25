import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User, UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe( {
      next: () => {
        // Sucesso, recarregue os pratos
        alert('Usuário deletado com sucesso!');
        this.loadUsers();
      },
      error: (error) => {
        // Erro, exiba um alerta
        alert('Não é possível excluir um usuário vinculado a um pedido!');
        console.error('Erro ao usuário o prato:', error);
      },
    });
  }

  getFirstName(name: string): string {
    let first = name.split(' ')[0]
    let second = name.split(' ')[1] || ''
    return first + ' ' + second;
  }

  upercaseFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
