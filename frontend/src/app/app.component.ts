import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticateService } from './services/auth/authenticate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  showHeader: boolean = true;
  isGerente: boolean = false;
  isCliente: boolean = false;
  isEntregador: boolean = false;
  isAuthenticated: boolean = false;
  authService: AuthenticateService;

  private authSubscription: Subscription;

  constructor(private router: Router, authService: AuthenticateService) {
    this.router.events.subscribe(() => {
      this.showHeader = this.router.url !== '/login';
    });
    this.authService = authService;
    this.authSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authState$.subscribe(authState => {
      this.isAuthenticated = authState.isAuthenticated;
      this.isGerente = authState.role === 'gerente';
      this.isCliente = authState.role === 'cliente';
      this.isEntregador = authState.role === 'entregador';
    });
  }

  goBack(): void {
    const currentUrl = this.router.url;
    if (currentUrl === '/dishes') {
      console.log('Já está na página inicial');
      return;
    }
    window.history.back();
  }

  canGoBack(): boolean {
    return this.router.url !== '/dishes';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    setTimeout(() => {
      alert('Sessão finalizada!');
    }, 1000);
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}