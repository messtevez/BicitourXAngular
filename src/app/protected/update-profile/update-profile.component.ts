import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';
import { ApiResponse, User } from '../../interfaces/user';



@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FormsModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {
  email: string = ''
  pw: string = ''
  edad: string = ''
  nombre: string = ''
  nacionalidad: string = ''
  tipoDeDocumento: string = ''
  documentoDeIdentidad: string = ''
  numeroDeContacto: string = ''
  user: any = {}



  constructor(private authService: AuthService, private router: Router, private activeRoute: ActivatedRoute) { }


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
    this.authService.updateUser(user.email, user.pw, user.edad, user.nombre, user.nacionalidad, user.tipoDeDocumento, user.documentoDeIdentidad, user.numeroDeContacto).subscribe(
      (response: any) => {
        if (response.ok) {
          Swal.fire('Datos actualizados correctamente.', response.msg, 'success')
          sessionStorage.setItem('nombre', response.user.nombre);
          const rol = sessionStorage.getItem('rol')
          if (rol== 'admin') {
            this.router.navigate(['/dashboardA']);
          } else {
            this.router.navigate(['/dashboardU']);
          } 
        } else {
          Swal.fire('Error, intenta nuevamente.', response.msg.error, 'error')
        }
      }, error => {
        console.log(error)
        Swal.fire('Error. Contacta a un administrador.', error.error.msg, 'error')
      }
    )
  }

  ngOnInit() {
    const userEmail: any = this.activeRoute.snapshot.paramMap.get('email')
    if (userEmail) {
      this.authService.getUserByEmail(userEmail).subscribe(
        (response: any) => {
          this.email = response.email
          this.nombre = response.nombre
          this.edad = response.edad
          this.pw = response.pw
          this.nacionalidad = response.nacionalidad
          this.tipoDeDocumento = response.tipoDeDocumento
          this.numeroDeContacto = response.numeroDeContacto
          this.documentoDeIdentidad = response.documentoDeIdentidad
        }, error => {
          console.log(error)
        }
      )
    }
  }

}

