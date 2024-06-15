import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';

interface Product {
  name: string;
  image: string;
  weight: string;
  price: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  estimatedDeliveryDate: string = '';
  paymentRequest!: google.payments.api.PaymentDataRequest;
  isFeedbackFormOpen: boolean = false;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.calculateEstimatedDeliveryDate();
    this.setupGooglePay();
  }

  getTotal(): number {
    return this.cartService.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  calculateEstimatedDeliveryDate(): void {
    const currentDate = new Date();
    const estimatedDeliveryDate = new Date(currentDate.getTime() + (5 * 24 * 60 * 60 * 1000)); // Adding 5 days
    this.estimatedDeliveryDate = estimatedDeliveryDate.toLocaleDateString();
  }

  removeItem(product: Product): void {
    this.cartService.removeFromCart(product);
  }

  updateQuantity(product: Product, quantity: number): void {
    const currentQuantity = this.cartService.getProductQuantity(product);
    const newQuantity = currentQuantity + quantity;

    if (newQuantity <= 0) {
      this.cartService.removeFromCart(product);
    } else {
      this.cartService.updateQuantity(product, newQuantity);
    }
  }

  setupGooglePay(): void {
    this.paymentRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [{
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }],
      merchantInfo: {
        merchantId: '12345678901234567890',
        merchantName: 'Demo Merchant'
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: this.getTotal().toFixed(2),
        currencyCode: 'USD',
        countryCode: 'US'
      }
    };
  }

  onLoadPaymentData(event: any): void {
    console.log('Payment data loaded', event.detail);
    // Handle payment success here
  }

  openFeedbackForm(): void {
    this.isFeedbackFormOpen = true;
  }

  closeFeedbackForm(): void {
    this.isFeedbackFormOpen = false;
  }
}
