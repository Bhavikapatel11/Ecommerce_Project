import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login, SignUp } from '../datatype.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUser = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private route: Router) { }

  userSignUp(user: SignUp){
    this.http.post('http://localhost:3000/users', user , { observe: 'response'})
      .subscribe((result)=>{
        console.log(result);
        if(result){
          localStorage.setItem('user', JSON.stringify(result.body));
          this.route.navigate(['/']);
        }
      })
  }

  reloadUserauth(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/'])
    }
  }

  userLogin(data: Login){
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response'})
      .subscribe((result)=>{
        if(result && result.body?.length){
          this.invalidUser.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.route.navigate(['/']);          
        }else{
          this.invalidUser.emit(true);
        }
      })
  }
}
