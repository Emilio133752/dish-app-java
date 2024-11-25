import { Component } from '@angular/core';
import { User } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticateService } from '../../../services/auth/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  user: User = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthenticateService, private router: Router) {}

  login() {
    this.authService.login(this.user.email, this.user.password || '').subscribe(
      (data) => {
        this.authService.saveToken(data.token);
        const role = this.authService.getRole();

        const cart = localStorage.getItem('cart');
        if (cart) {
          this.router.navigate(['/finalizado']);
          return;
        }

        switch(role) {
          case 'gerente':
            this.router.navigate(['/gerente']);
            break;
          case 'cliente':
            this.router.navigate(['/pedido']);
            break
          case 'entregador':
            this.router.navigate(['/entregas']);
            break
          default : this.router.navigate(['/']);
        }
      },
      (error) => {
        alert('Usuário e/ou senha inválidas!')
        console.error('Erro de autenticação', error);
      }
    );
  }
}
