import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  userLoginOn:boolean = false;
  userDate?:User;

  constructor(private loginService:LoginService){
    this.loginService.currentUserLoginOn.subscribe({
        next:(userLoginOn)=> {
          this.userLoginOn = userLoginOn;
        },
      });

    this.loginService.currentUserData.subscribe({
        next:(userData)=>{
          this.userDate = userData;
        },
    });  
  }

}
