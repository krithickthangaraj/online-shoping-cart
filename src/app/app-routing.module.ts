import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './mycomponent/catalogue/catalogue.component';
import { CartComponent } from './mycomponent/cart/cart.component';
import { CheckoutPageComponent } from './mycomponent/checkout-page/checkout-page.component';
import { HomeComponent } from './mycomponent/home/home.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
  { path: 'feedback', component: FeedbackComponent },
  { path: '', redirectTo: '/catalogue', pathMatch: 'full' },
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout-page', component: CheckoutPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
