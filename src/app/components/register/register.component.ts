import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public email: string = '';
  public pw: string = '';
  public edad: string = '';
  public nombre: string = '';
  public nacionalidad: string = '';
  public tipoDeDocumento: string = '';
  public documentoDeIdentidad: string = '';
  public numeroDeContacto: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  public onSubmit(event: Event): void {
    this.authService.register(
      this.email,
      this.pw,
      this.edad,
      this.nombre,
      this.nacionalidad,
      this.tipoDeDocumento,
      this.documentoDeIdentidad,
      this.numeroDeContacto
    ).subscribe({
      next: response => {
        if (response.ok) {
          console.log(response);
          Swal.fire('Usuario registrado', response.msg, 'success');
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('nombre', response.nombre);
          sessionStorage.setItem('email', response.email);
          sessionStorage.setItem('id', response.user.id);
          this.router.navigate(['/dashboardU']);
        } else {
          Swal.fire('Error al crear usuario', response.error.msg, 'error');
        }
      },
      error: error => {
        console.log(error);
        Swal.fire('Error. Contacta a un administrador.', error.error.msg, 'error');
      },
      complete: () => {
        console.log('Registration request completed');
      }
    });
  }
}
