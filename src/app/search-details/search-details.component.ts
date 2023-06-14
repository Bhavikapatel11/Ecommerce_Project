import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart, Product } from '../datatype.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.css'],
})
export class SearchDetailsComponent implements OnInit {
  productData: undefined | Product;
  productQuantity: number = 1;
  quantity: number = 1;
  removeCart = false;
  cartremoveData: Product | undefined;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private route: Router
  ) {}

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId &&
      this.productService.getProduct(productId).subscribe((result) => {
        //console.log(result);
        this.productData = result;

        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (item: Product) => productId == item.id.toString()
          );
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }

        // this show data is stick to userdata like addtocart is remove and remove to cart will display
        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.productService.getListCart(userId);
          this.productService.cartData.subscribe((result) => {
            let item = result.filter(
              (item: Product) =>
                productId?.toString() === item.productId?.toString()
            );
            if (item.length) {
              this.cartremoveData = item[0];
              this.removeCart = true;
            }
          });
        }
      });
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      //console.log(this.productData);
      if (!localStorage.getItem('user')) {
        //console.log(this.productData);
        this.productService.localAddtoCart(this.productData);
        this.removeCart = true;
      } else {
        //console.warn('user logged in');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        //console.warn(userId);
        // make object
        let cartData: Cart = {
          ...this.productData,
          productId: this.productData.id,
          userId,
        };
        //console.warn(cartData);
        // delete product id in cartdata
        delete cartData.id;

        this.productService.addToCart(cartData).subscribe((result) => {
          if (result) {
            //alert('added');
            // update user cart item and add remove cart
            this.productService.getListCart(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }

  buyNow(){
    this.route.navigate(['/cart-page'])
  }

  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.productService.removeitemToCart(productId);
    }else{
      console.warn(this.cartremoveData);
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      this.cartremoveData &&  
          this.productService.removeToCart(this.cartremoveData.id)
            .subscribe((result)=>{
              if(result){
                this.productService.getListCart(userId);
              }
      })
    }
    this.removeCart = false;

  }
}
