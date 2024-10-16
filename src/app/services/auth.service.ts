import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public register(
    email: string,
    pw: string,
    edad: string,
    nombre: string,
    nacionalidad: string,
    tipoDeDocumento: string,
    documentoDeIdentidad: string,
    numeroDeContacto: string
  ): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/registro`, {
      email, pw, edad, nombre, nacionalidad, tipoDeDocumento, documentoDeIdentidad, numeroDeContacto
    });
  }

  public login(email: string, pw: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/login`, { email, pw }).pipe(
      tap(response => {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('nombre', response.nombre);
        sessionStorage.setItem('email', response.email);
        sessionStorage.setItem('rol', response.rol.rol);
      })
    );
  }

  public updateUser(
    email: string,
    pw: string,
    edad: string,
    nombre: string,
    nacionalidad: string,
    tipoDeDocumento: string,
    documentoDeIdentidad: string,
    numeroDeContacto: string
  ): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/update-user`, {
      email, pw, edad, nombre, nacionalidad, tipoDeDocumento, documentoDeIdentidad, numeroDeContacto
    });
  }

  public getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/get-user-email/${email}`);
  }

  public getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  public isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  public loggedOut(): void {
    sessionStorage.clear();
  }

  public getName(): string | null {
    return sessionStorage.getItem('nombre');
  }

  public getRole(): string | null {
    return sessionStorage.getItem('rol');
  }

  public assignRole(datos:any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/assign-role`, datos)
  } 

}
