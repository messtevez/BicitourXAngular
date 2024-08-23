import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgStyle, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() background: string = '#55575A'

  nombre: any = ''
  constructor(private authService:AuthService, private router:Router){}

  get isLoggedIn(): boolean{
    const tokenExist : boolean | undefined = this.authService.isLoggedIn()
    if(tokenExist){
      const fullName = sessionStorage.getItem('nombre')
      const cutFullName: any = fullName?.split(' ')
      this.nombre = cutFullName[0]
    }

    return tokenExist 
  }

  logout(){
    this.authService.loggedOut()
    this.router.navigate(['/login'])
  }
}
