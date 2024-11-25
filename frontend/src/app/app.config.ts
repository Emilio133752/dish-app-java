import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DishListComponent } from './components/dish-list/dish-list.component';
import { DishFormComponent } from './components/dish-form/dish-form.component';
import { DishStoreComponent } from './components/dish-store/dish-store.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AdicionarComponent } from './pages/gerente/usuarios/adicionar/adicionar.component';
import { AdicionarComponent as AdicionarCategComponent } from './pages/gerente/categorias/adicionar/adicionar.component';
import { ListarComponent } from './pages/gerente/usuarios/listar/listar.component';
import { ListarComponent as ListarCategComponent } from './pages/gerente/categorias/listar/listar.component';
import { AdicionarComponent as AdicionarProdutoComponent } from './pages/gerente/produtos/adicionar/adicionar.component';
import { ListarComponent as ListarProdutoComponent } from './pages/gerente/produtos/listar/listar.component';
import { ListarComponent as ListarPedidosComponent } from './pages/gerente/pedidos/listar/listar.component';
import { ListarComponent as HistoricoComponent } from './pages/publico/pedidos/listar/listar.component';
import { ListarComponent as ListagemEntregasComponent } from './pages/entregador/listar/listar.component';
import { DetalhesComponent } from './pages/publico/pedidos/detalhes/detalhes.component';
import { DetalhesComponent as DetalhesEntregas } from './pages/entregador/detalhes/detalhes.component';
import { DetalhesComponent as DetalhesGerenteEntregas } from './pages/gerente/pedidos/detalhes/detalhes.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JWT_OPTIONS, JwtHelperService, JwtInterceptor } from '@auth0/angular-jwt';
import { clienteGuardGuard } from './services/auth/guards/cliente-guard.guard';
import { gerenteGuardGuard } from './services/auth/guards/gerente-guard.guard';
import { entregadorGuardGuard } from './services/auth/guards/entregador-guard.guard';

const routes: Routes = [
  // { path: '**', redirectTo: '/login' },
  { path: '',                      component: DishStoreComponent },
  { path: 'login',                 component: LoginComponent },
  { path: 'finalizado',            component: CheckoutComponent },
  { path: 'pedido',                component: OrderTrackingComponent,    canActivate: [clienteGuardGuard] },
  { path: 'detalhes/:id',          component: DetalhesComponent,         canActivate: [clienteGuardGuard] },
  { path: 'historico',             component: HistoricoComponent,        canActivate: [clienteGuardGuard] },
  { path: 'entregas',              component: ListagemEntregasComponent, canActivate: [entregadorGuardGuard] },
  { path: 'entregas/detalhes/:id', component: DetalhesEntregas,          canActivate: [entregadorGuardGuard] },
  { path: 'orders/detalhes/:id',   component: DetalhesGerenteEntregas,   canActivate: [entregadorGuardGuard] },
  { path: 'gerente',               component: DishListComponent,         canActivate: [gerenteGuardGuard] },
  { path: 'add-dish',              component: DishFormComponent,         canActivate: [gerenteGuardGuard] },
  { path: 'edit-dish/:id',         component: DishFormComponent,         canActivate: [gerenteGuardGuard] },
  { path: 'add-user',              component: AdicionarComponent,        canActivate: [gerenteGuardGuard] },
  { path: 'edit-user/:id',         component: AdicionarComponent,        canActivate: [gerenteGuardGuard] },
  { path: 'user',                  component: ListarComponent,           canActivate: [gerenteGuardGuard] },
  { path: 'add-category',          component: AdicionarCategComponent,   canActivate: [gerenteGuardGuard] },
  { path: 'edit-category/:id',     component: AdicionarCategComponent,   canActivate: [gerenteGuardGuard] },
  { path: 'category',              component: ListarCategComponent,      canActivate: [gerenteGuardGuard] },
  { path: 'add-product',           component: AdicionarProdutoComponent, canActivate: [gerenteGuardGuard] },
  { path: 'edit-product/:id',      component: AdicionarProdutoComponent, canActivate: [gerenteGuardGuard] },
  { path: 'products',              component: ListarProdutoComponent,    canActivate: [gerenteGuardGuard] },
  { path: 'orders',                component: ListarPedidosComponent,    canActivate: [gerenteGuardGuard] },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule), provideAnimationsAsync(), provideAnimationsAsync(),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS , useClass: JwtInterceptor, multi: true },
    JwtHelperService,
  ]
};