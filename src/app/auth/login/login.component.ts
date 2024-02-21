import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginError:string='';

  loginForm = this.formBuilder.group({
    email:['good@good.com', [Validators.required, Validators.email]],
    password:['', Validators.required],
  })

  constructor(private formBuilder:FormBuilder, private router:Router, private loginService:LoginService){}

  ngOnInit(): void {}

  login(){
    if(this.loginForm.valid){
      //console.log("Llamar al servicio del login");
      /*le pasamos la informacion del formulario Y la comvertifos al formato de la clase indicada LoginRequest*/
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next:(userData) =>{
          console.log(userData)
        },
        error:(errorData)=>{
          console.error(errorData)
          this.loginError = errorData;
        },
        complete:()=>{
          console.info("Login completo");
          this.router.navigateByUrl("/inicio");
          this.loginForm.reset();
        }
      });

    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }

  get email(){
    return this.loginForm.controls.email;
  }
  get password(){
    return this.loginForm.controls.password;
  }

}
