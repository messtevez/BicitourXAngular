import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl = "http://localhost:4001/api"
  constructor(private http: HttpClient) { }

  register(email: string, pw: string, edad: string, nombre: string, nacionalidad: string, tipoDeDocumento: string, documentoDeIdentidad: string, numeroDeContacto:string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/registro`, {email, pw, edad, nombre, nacionalidad, tipoDeDocumento, documentoDeIdentidad, numeroDeContacto})
  }

  login(email: string, pw: string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/login`, {email, pw})
  }

  updateUser(email: string, pw: string, edad: string, nombre: string, nacionalidad: string, tipoDeDocumento: string, documentoDeIdentidad: string, numeroDeContacto:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/update-user`,{email, pw, edad, nombre, nacionalidad, tipoDeDocumento, documentoDeIdentidad, numeroDeContacto})
  }

  getUserByEmail(email:string){
    return this.http.get(`${this.apiUrl}/get-user-email/${email}`)
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
