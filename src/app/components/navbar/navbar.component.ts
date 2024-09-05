import { CommonModule, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgStyle, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit{
  @Input() background: string = '#55575A'

  nombre: any = ''
  isModalOpen: boolean = false;
  email: any = ''
  rol: any = ''

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('email')) {
      this.email = sessionStorage.getItem('email')
    }
    if (sessionStorage.getItem('nombre')) {
      this.nombre = sessionStorage.getItem('nombre')
    } else {
      this.nombre = 'Usuario'
    }
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }

  openModal() {
    this.isModalOpen = !this.isModalOpen
  }

  perfil(): void {
    const rol = sessionStorage.getItem('rol')

    if (rol === 'admin'){
      this.router.navigate(['/dashboardA']);
    }else if (rol === 'users') {  
      this.router.navigate(['/dashboardU']);
    }
  }

  


  logout() {
    this.authService.loggedOut()
    this.router.navigate(['/ingreso'])
  }

  update(): void {
    this.router.navigate(['/actualizardatos', this.email])
  }
}
