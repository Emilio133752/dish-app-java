import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles, User, UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-adicionar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './adicionar.component.html',
  styleUrl: './adicionar.component.css'
})
export class AdicionarComponent implements OnInit {
  user: User = {
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: Roles.cliente
  }
  isEdit: boolean = false

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.userService.getUser(+id).subscribe((data: User) => {
        this.user = data;
      });
    }
  }

  submit() {
    if (this.isEdit) {
      this.userService.updateUser(this.user.id!, this.user).subscribe(
        (response) => {
          this.router.navigate(['/user']);
        },
        (error) => {
          alert('Erro ao atualizar usuário')
          console.error('Erro ao atualizar usuário:', error);
        }
      );
    } else {
      this.userService.createUser(this.user).subscribe(
        (response) => {
          console.log(response);
          if (response.status === 201) { 
            this.router.navigate(['/user']);
            setTimeout(() => {
              alert('Usuário criado com sucesso!');
            }, 1000);
          } else {
            alert('Erro ao criar usuário!');
          }
        },
        (error) => {
          if (error.status === 201) { 
            this.router.navigate(['/user']);
            setTimeout(() => {
              alert('Usuário criado com sucesso!');
            }, 1000);
          } else {
            alert(error.error)
            console.error('Erro ao criar usuário:', error);
          }
        }
      );
    }
  }
}
