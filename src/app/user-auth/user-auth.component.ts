import { Component, OnInit } from '@angular/core';
import { Cart, Login, Product, SignUp } from '../datatype.model';
import { ProductService } from '../service/product.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showuserLogin: boolean = true;
  userAuth: string="";

  constructor(private userService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
    this.userService.reloadUserauth();
  }

  signUpuser(data: SignUp){
    //console.log(data);
    this.userService.userSignUp(data);
  }

  loginUser(data: Login){
    this.userService.userLogin(data); 
    this.userService.invalidUser.subscribe((result)=>{
      if(result){
        this.userAuth = "Please enter correct details";
      }else{
        setTimeout(() => {
          this.localStoragetoRemotecart();
        }, 300);
      }
    })   
  }

  openuserLogin(){
    this.showuserLogin= true;
  }

  openuserSignup(){
    this.showuserLogin= false;
  }

  localStoragetoRemotecart(){
    //cartdata get and user data get
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if(data){
      // convert json format data into object
      let cartDataList: Product[] = JSON.parse(data);
      
      cartDataList.forEach((product: Product, index) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId
        }

        delete cartData.id;
        
        setTimeout(() => {
          // this code will happen fast so we give settimeout property
          this.productService.addToCart(cartData).subscribe((result)=>{
            if(result){
              console.warn('stored in db');
            }
          })
        }, 500);
        if(cartDataList.length === index+1){
          localStorage.removeItem('localCart')
        }
      })
    } 

    setTimeout(() => {
      this.productService.getListCart(userId);
    }, 700);
    
  }
}
