import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { SeParteDeBicitourComponent } from './components/se-parte-de-bicitour/se-parte-de-bicitour.component';



export const routes: Routes = [
    {path: '', title: `Home`, component: HomeComponent},
    {path: 'ingreso', title:'Ingreso', component: LoginComponent},
    {path: 'eventos', title: 'Eventos', component: EventosComponent}, 
    {path: 'quienesSomos', title: 'Quienes Somos', component: QuienesSomosComponent}, 
    {path: 'seParteDeBicitourX', title: 'Se parte de Bicitour X', component: SeParteDeBicitourComponent}
];
