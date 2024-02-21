import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError,BehaviorSubject, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); //debe tener un valor por defecto el behaviorSuject
  currentUserData:BehaviorSubject<User> = new BehaviorSubject<User>({id:0, email:''}); // lo ideal es tener la informacion de la sesion modificar cuadno tengamos apis y jwt

  constructor(private http:HttpClient) {}

  login(credentials:LoginRequest):Observable<User>{
    //console.log(credentials);
    return this.http.get<User>('././assets/data.json').pipe(
      tap(userData =>{
        this.currentUserData.next(userData); //guardamos la informacion para pasar a los demas componentes
        this.currentUserLoginOn.next(true); // guardamos la informacion para pasar a los que la sesion esta en linea
      }),
      catchError(this.handleEerror)
    );
  }

  private handleEerror(error:HttpErrorResponse){
    if(error.status === 0){
      console.error("Se ha producido un error ", error.error);
    }else{
      console.error('Backend retornó el código de estado ',error.status, error.error);
    }
    return throwError(()=> new Error ( 'Algo falló. Por favor intente nuevamente'));
  }

  get userData():Observable<User>{
    return this.currentUserData.asObservable(); //enviamos la informacion para que se subscriban los demas componentes
  }

  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();// enviamos la informacion para que se subscriban los demas componentes que la sesion esta en linea
  }

}
