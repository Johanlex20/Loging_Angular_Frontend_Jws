import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,  OnDestroy {
  
  userLoginOn:boolean = false;
  userDate?:User;

  constructor(private loginService:LoginService){}

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.unsubscribe();
  }

}
