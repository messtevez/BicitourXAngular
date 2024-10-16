import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from 'fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventService } from '../../services/event.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpBackend } from '@angular/common/http';



@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [FullCalendarModule, NavbarComponent, FormsModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    eventClick: (info) => {
      this.selectedEventId = info.event.extendedProps['_id'];
      this.eventCost = info.event.extendedProps['cost']
      this.eventDistance = info.event.extendedProps['distance']
      this.eventTime = info.event.extendedProps['hour']
      this.eventLocation = info.event.extendedProps['location']
      this.eventCategory = info.event.extendedProps['category']
      this.monstrarVentana = true
    }
  };

  // eventInfo:EventModelo = {}
  public selectedEventId: string = '';
  eventDistance = ''
  eventCost = 0
  eventTime = ''
  eventLocation = ''
  eventCategory = ''

  monstrarVentana = false
  ventanaRol = false


  email: string = ''
  datos: any = {
    userEmail: this.email,
    roleId: '66d90bab8d00ca07a4985623'
  }

  constructor(private router: Router, private eventService: EventService, private authService: AuthService) { }

  ngOnInit(): void {
    // const userId = sessionStorage.getItem('id');
    // if (userId) {
    //   this.eventService.getEventsByUserId(userId).subscribe({
    //     next: (response) => {
    //       if (response.ok && response.events) {
    //         this.calendarOptions.events = response.events.map((event: any) => ({
    //           title: event.name,
    //           start: event.date + 'T' + event.hour,
    //           end: event.date + 'T' + event.hour
    //         }));
    //       }
    //     },
    //     error: (error) => {
    //       console.error('Error al obtener los eventos del administrador:', error);
    //     }
    //   });
    // } else {
    //   console.error('No se encontró el ID del usuario en sessionStorage.');
    // }
    this.llenarEventos()
  }

  navigateToCreateEvent(): void {
    this.router.navigate(['/crearEvento']);
  }

  eliminarEvento(): void {
    console.log(this.selectedEventId)
    if (this.selectedEventId != '') {

      Swal.fire({
        title: '¿Estás seguro?',
        text: `Estás a punto de eliminar el evento.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {

          this.eventService.deleteEventById(this.selectedEventId).subscribe({
            next: (response) => {
              console.log(response)
              if (response.ok) {
                Swal.fire('Eliminado', response.msg, 'success');

                const calendarApi = this.calendarComponent.getApi();
                const event = calendarApi.getEventById(this.selectedEventId);
                if (event) {
                  event.remove();
                }
                this.llenarEventos()
                this.monstrarVentana = false;
                this.selectedEventId = '';
              } else {
                Swal.fire('Error', response.msg, 'error');
              }
            },
            error: (error) => {
              console.error('Error al eliminar el evento:', error);
              Swal.fire('Error', 'No se pudo eliminar el evento.', 'error');
            }
          });
        }
      });
    }
  }

  llenarEventos(): void {
    this.eventService.getAllEvents().subscribe((response: any) => {
      this.calendarOptions.events = response.events
      console.log(this.calendarOptions.events)
    })
  }

  assignRole() {
    this.datos = {
      userEmail: this.email,
      roleId: '66d90bab8d00ca07a4985623'
    }
    this.authService.assignRole(this.datos).subscribe((response: any) => {
      if (response.ok) {
        Swal.fire('Rol asignado correctamente al usuario.', response.msg, 'success')
        this.router.navigate(['/dashboardA'])
      } else {
        Swal.fire('Error, intenta nuevamente.', response.msg.error, 'error')
      }
    }, error => {
      console.log(error)
      Swal.fire('Error. Contacta a un administrador.', error.error.msg, 'error')
    }
    )
  }

  roles() {
    this.ventanaRol = true
  }

  agregarUsuarios(){
    this.datos = {
      email: this.email
    }
    console.log(this.datos.email, this.selectedEventId)
    this.eventService.addAttendeeToEvent(this.selectedEventId,{email:this.datos.email}).subscribe((response)=>{
      if (response.ok) {
        Swal.fire('Registro exitoso', response.msg, 'success')
        this.router.navigate(['/dashboardA'])
      }else{
        Swal.fire('Error, intenta nuevamente.', response.msg.error, 'error')
      }
    }, error => {
      console.log(error)
      Swal.fire('Error.', error.error.msg, 'error')
    })
  }

}



