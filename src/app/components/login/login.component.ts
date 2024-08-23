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
        this.router.navigate(['/perfil'])
      }, error=>{
        Swal.fire('Error', error.error.msg, 'error')
      }
    )
  }


}
