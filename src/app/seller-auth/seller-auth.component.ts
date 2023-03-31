import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from '../datatype.model';
import { SellerService } from '../service/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private sellerservice: SellerService ) { }
  
  showLogin = false;
  authError: string = '';

  ngOnInit(): void {
    this.sellerservice.reloadSeller();
  }

  signUp(data: SignUp): void{
    this.sellerservice.userSignUp(data);
    this.sellerservice.isLoginError.subscribe((isError) =>{
      if(isError){
        this.authError = "Email or password is incorrect"
      }
    })
/*    .subscribe((result)=>{
      if(result){ this.route.navigate(['seller-home'])}});  */
  }

  logIn(data: SignUp): void{
    //console.log(data);
    this.sellerservice.userLogin(data);
    this.sellerservice.isLoginError.subscribe((isError) =>{
      if(isError){
        this.authError = "Email or password is incorrect"
      }
    })
  }

  openLogin(){
    this.showLogin = true; 
  }
  openSignup(){
    this.showLogin = false; 
  }

}
