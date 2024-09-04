import { Component, numberAttribute } from '@angular/core';
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
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = ''
  pw: string = ''
  edad: string = ''
  nombre: string = ''
  nacionalidad: string = ''
  tipoDeDocumento: string = ''
  documentoDeIdentidad: string = ''
  numeroDeContacto: string = ''

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(event: Event): void {
    const user: User = {
      ok: true,
      email: this.email,
      pw: this.pw,
      edad: this.edad,
      nombre: this.nombre,
      nacionalidad: this.nacionalidad,
      tipoDeDocumento: this.tipoDeDocumento,
      documentoDeIdentidad: this.documentoDeIdentidad,
      numeroDeContacto: this.numeroDeContacto
    }
    this.authService.register(user).subscribe(
      response => {
        if (response.ok) {
          Swal.fire('Usuario registrado', response.msg, 'success')
          this.router.navigate(['/perfil'])
        } else {
          Swal.fire('Error al crear usuario', response.error.msg, 'error')
        }
      }, error => {
        Swal.fire('Error. Contacta a un administrador.', error.error.msg.msg, 'error')
      }
    )
  }
}
