import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, Pricesummary } from '../datatype.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartList: Cart[] | undefined;
  priceData: Pricesummary = {
    price: 0,
    tax: 0,
    delivery: 0,
    discount: 0,
    total: 0
  }

  constructor(private productService: ProductService, private route: Router) { }

  ngOnInit(): void {
    this.loadingCart();

  }

  loadingCart(){
    this.productService.currentCart().subscribe((result)=>{
      //console.warn(result);
      this.cartList = result

      let price = 0;
      result.forEach((item) => {
        if(item.quantity){
          price = price + (+item.price * +item.quantity);
        }
      });
      this.priceData.price = price;
      this.priceData.tax = price/10;
      this.priceData.delivery = 100;
      this.priceData.discount = price/10;
      this.priceData.total = price + (price/10) + 100 - (price/10);
      //console.warn(this.priceData);
      if(!this.cartList.length){
        this.route.navigate(['/']);
      }
      
    });
  }
  removeToCart(cartId: number | undefined){
    cartId && this.cartList &&  
          this.productService.removeToCart(cartId)
            .subscribe((result)=>{
              this.loadingCart();
      })
  }

  checkOut(){
    this.route.navigate(['/checkout']);
  }

}
