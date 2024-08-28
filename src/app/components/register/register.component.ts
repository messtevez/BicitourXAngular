import { Component, numberAttribute } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';



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
  numeroDeContacto:string=''

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(event: Event): void {
    this.authService.register(this.email, this.pw, this.edad, this.nombre, this.nacionalidad, this.tipoDeDocumento, this.documentoDeIdentidad, this.numeroDeContacto).subscribe(
      response => {
        if (response.ok) {
          console.log(response)
          Swal.fire('Usuario registrado', response.msg, 'success')
          this.router.navigate(['/perfil'])
        } else {
          Swal.fire('Error al crear usuario', response.error.msg, 'error')
        }
      }, error => {
        console.log(error)
        Swal.fire('Error. Contacta a un administrador.', error.error.msg, 'error')
      }
    )
  }
}
