import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogueComponent } from './mycomponent/catalogue/catalogue.component';
import { CartComponent } from './mycomponent/cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutPageComponent } from './mycomponent/checkout-page/checkout-page.component';
import { NavbarComponent } from './mycomponent/navbar/navbar.component';
import { HomeComponent } from './mycomponent/home/home.component';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { FeedbackComponent } from './feedback/feedback.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CatalogueComponent,
    CartComponent,
    CheckoutPageComponent,
    NavbarComponent,
    HomeComponent,
    FeedbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GooglePayButtonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
