import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy{
  
  userLoginOn:boolean = false;

  constructor(private loginService:LoginService){}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
        next:(userLoginOn)=> {
          this.userLoginOn = userLoginOn;
        },
      });
  }

  ngOnDestroy(): void {
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.unsubscribe();
  }

}
