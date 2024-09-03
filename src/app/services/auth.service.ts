import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(email: string, pw: string, edad: string, nombre: string, nacionalidad: string, tipoDeDocumento: string, documentoDeIdentidad: string, numeroDeContacto:string): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/registro`, {email, pw, edad, nombre, nacionalidad, tipoDeDocumento, documentoDeIdentidad, numeroDeContacto})
  }

  login(email: string, pw: string):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/login`, {email, pw})
  }

  updateUser(email: string, pw: string, edad: string, nombre: string, nacionalidad: string, tipoDeDocumento: string, documentoDeIdentidad: string, numeroDeContacto:string):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/update-user`,{email, pw, edad, nombre, nacionalidad, tipoDeDocumento, documentoDeIdentidad, numeroDeContacto})
  }

  getUserByEmail(email:string){
    return this.http.get(`${environment.apiUrl}/get-user-email/${email}`)
  }

  getToken():string|null{
    return sessionStorage.getItem('token')
  }

  isLoggedIn():boolean{
    return !!sessionStorage.getItem('token')
  }

  loggedOut():void{
    sessionStorage.clear()
  }

  getName():string|null{
    return sessionStorage.getItem('nombre')
  }

}
