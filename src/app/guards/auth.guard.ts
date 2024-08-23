import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate {

  constructor( private router:Router){}
  
  canActivate(): boolean {
    const token = sessionStorage.getItem('token')
    if (token) {
      return true
    }
    this.router.navigate(['/ingreso'])
    return false
  }
};
