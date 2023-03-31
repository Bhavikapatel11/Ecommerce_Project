import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, Order } from '../datatype.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  selectedItem='';
  totalPrice: number | undefined;
  cartData: Cart[] | undefined;
  cartMsg: string | undefined;

  constructor(private productService: ProductService, private route: Router) { }

  ngOnInit(): void {
    this.productService.currentCart().subscribe((result)=>{

      this.cartData = result;

      let price = 0;
      result.forEach((item) => {
        if(item.quantity){
          price = price + (+item.price * +item.quantity);
        }
      });
      this.totalPrice = price + (price/10) + 100 - (price/10);
      console.warn(this.totalPrice);
      
    });

  }

  order(data: {email: string, address: string, contact: string}){
    //console.warn(data);
    
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if(this.totalPrice){
      let orderData: Order = {
        ...data,
        totalprice: this.totalPrice,
        paymentValue: this.selectedItem,
        userId,
        id: undefined
      }

      this.cartData?.forEach((item)=>{
        setTimeout(() => {
          item.id && this.productService.deleteCartItem(item.id)
        }, 800);
      })

      this.productService.orders(orderData).subscribe((result)=>{
        if(result){
          //alert('your order has been placed..:)');
          setTimeout(() => {
            this.cartMsg = 'Your order has been placed..:)'
          }, 4000);
          this.route.navigate(['/my-order']);
          this.cartMsg = undefined;
        }
      })
    }

  }
}
