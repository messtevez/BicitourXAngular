import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { SeParteDeBicitourComponent } from './components/se-parte-de-bicitour/se-parte-de-bicitour.component';
import { PerfilComponent } from './protected/perfil/perfil.component';
import { authGuard } from './guards/auth.guard';
import { UpdateProfileComponent } from './protected/update-profile/update-profile.component';



export const routes: Routes = [
    {path: '', title: `Home`, component: HomeComponent},
    {path: 'ingreso', title:'Ingreso', component: LoginComponent},
    {path: 'eventos', title: 'Eventos', component: EventosComponent}, 
    {path: 'quienesSomos', title: 'Quienes Somos', component: QuienesSomosComponent}, 
    {path: 'seParteDeBicitourX', title: 'Se parte de Bicitour X', component: SeParteDeBicitourComponent},
    {path: 'registro', title:'Registro', component: RegisterComponent}, 
    {path: 'perfil', title: 'Perfil', component: PerfilComponent, canActivate:[authGuard]}, 
    {path: 'actualizardatos/:email', title: 'Actualiza tus datos', component: UpdateProfileComponent, canActivate:[authGuard]}
];
