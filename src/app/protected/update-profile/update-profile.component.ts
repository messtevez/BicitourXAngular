import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';



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
  numeroDeContacto: string=''
  user:any={}

  constructor(private authService: AuthService, private router: Router, private activeRoute: ActivatedRoute) { }

  onSubmit(event: Event): void {
    this.authService.updateUser(this.email, this.pw, this.edad, this.nombre, this.nacionalidad, this.tipoDeDocumento, this.documentoDeIdentidad, this.numeroDeContacto).subscribe(
      response => {
        if (response.ok) {
          console.log(response)
          Swal.fire('Usuario actulizado.', response.msg, 'success')
          this.router.navigate(['/perfil'])
        } else {
          Swal.fire('Error al actualizar los datos', response.error.msg, 'error')
        }
      }, error => {
        console.log(error)
        Swal.fire('Error. Contacta a un administrador.', error.error.msg, 'error')
      }
    )
  }

  ngOnInit(){
    const userEmail:any = this.activeRoute.snapshot.paramMap.get('email')
    if (userEmail) {
      this.authService.getUserByEmail(userEmail).subscribe(
        response => {
          console.log(response) 
        },error=>{
          console.log(error)
        }
      )
    }
  }

}

