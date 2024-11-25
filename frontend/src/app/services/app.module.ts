import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';

// Importações dos seus componentes existentes
import { DishFormComponent } from '../components/dish-form/dish-form.component';
import { DishListComponent } from '../components/dish-list/dish-list.component';
import { DishStoreComponent } from '../components/dish-store/dish-store.component';
import { OrderTrackingComponent } from '../components/order-tracking/order-tracking.component';

@NgModule({
  declarations: [
    DishFormComponent,
    DishListComponent,
    DishStoreComponent,
    OrderTrackingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: DishStoreComponent },
      { path: 'gerente', component: DishFormComponent },
      { path: 'pedido', component: OrderTrackingComponent },
      { path: 'finalizado', component: DishListComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }