import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../datatype.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private route: Router) {}

  userSignUp(data: SignUp) {
    this.http
      .post('http://localhost:3000/product', data, { observe:'response'  })
      .subscribe((result) => {
        //this.isSellerLoggedIn.next(true);
        // for redirect
        if(result)
        {
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.route.navigate(['seller-home']);
        }
        //console.log('result', result);
      });
  }
  // for reload page like login it will come directly to sellerhome page
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.route.navigate(['seller-home'])
    }
  }

  userLogin(data: Login){
    this.http.get(`http://localhost:3000/product?email=${data.email}&password=${data.password}` , { observe:'response' })
      .subscribe((result: any)=>{
        console.log(result);
        if(result && result.body && result.body.length){
          console.log("success");
          localStorage.setItem('seller', JSON.stringify(result));
          this.route.navigate(['seller-home']);
        }else{
          console.log("failed");
          this.isLoginError.emit(true);
        }
    })
  }
}
