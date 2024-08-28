import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email:string=''
  pw:string=''

  constructor(private authService:AuthService, 
    private router:Router
  ){}

  
  login():void{
    this.authService.login(this.email, this.pw).subscribe(
      response=>{
        sessionStorage.setItem('token', response.token)
        sessionStorage.setItem('nombre', response.nombre)
        sessionStorage.setItem('email', response.email)
        this.router.navigate(['/perfil'])
        console.log(response)
      }, error=>{
        if(error.error.msg.email){
          Swal.fire('Error', error.error.msg.email.msg, 'error')
        }else if(error.error.msg.pw){
          Swal.fire('Error', error.error.msg.pw.msg, 'error')
        }else{
          console.log(error)
          Swal.fire('Error', error.error.msg, 'error')
        }        
      }
    )
  }

}
