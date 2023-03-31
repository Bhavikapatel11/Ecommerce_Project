import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../datatype.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType:string = 'default';
  sellerName:string = '';
  userName:string = '';
  searchResult: undefined | Product[];
  cartItems= 0;

  constructor(private route: Router , private Productservice: ProductService) { }

  ngOnInit(): void {
  this.route.events.subscribe((val: any) =>{
    //console.log(val);
    if(val.url){
      if (localStorage.getItem('seller') && val.url.includes('seller')) {
        let sellerStore=localStorage.getItem('seller');
        let sellerData =sellerStore && JSON.parse(sellerStore);
        this.sellerName=sellerData.name;
         this.menuType = 'seller';
       }
       else if(localStorage.getItem('user')){
         let userStore = localStorage.getItem('user');
         let userData = userStore && JSON.parse(userStore);
         this.userName= userData.name;
         this.menuType='user';
         this.Productservice.getListCart(userData.id);
       }
    }
    })
    
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }

    this.Productservice.cartData.subscribe((items)=>{
      this.cartItems = items.length;
    })

  }

  logOut(){
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }

  userLogOut(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
    this.Productservice.cartData.emit([]);
  }

  searchProduct(query: KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      //console.log(element.value);
      this.Productservice.searchProducts(element.value).subscribe((result)=>{
        //console.log(result);
        if(result.length>5){
          result.length = 5;
        }
        this.searchResult = result;
      })
    }
  }

  hideResult(){
    this.searchResult = undefined;
  }

  redirectTodetails(id: number){
    this.route.navigate(['/details/'+ id])
  }

  submitSearch(val: string){
    //console.log(val);
    this.route.navigate([`search/${val}`]);
  }
}
