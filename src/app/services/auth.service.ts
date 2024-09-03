import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl = "http://localhost:4001/api"
  constructor(private http: HttpClient) { }

  register(user: User): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/registro`, {data: user})
  }

  login(email: string, pw: string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/login`, {email, pw})
  }

  updateUser(user: User):Observable<User>{
    return this.http.put<any>(`${this.apiUrl}/update-user`,{data: user})
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
