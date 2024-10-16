import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import UploadImage from '../../services/store.service';
import { EventService } from '../../services/event.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './crear-eventos.component.html',
  styleUrls: ['./crear-eventos.component.css']
})
export class CrearEventosComponent {
  evento = {
    title: '',
    date: '',
    hour: '',
    location: '',
    cost: 0,
    distance: '',
    capacity: 0,
    category: '',
    descripcion:'',
    eventImg: [] as string[]
  };

  imagenes: string[] = [];
  imagenesTouched: boolean = false;
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(private eventService: EventService, private router:Router) {}

  async cargarImagenes(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      const filesArray = Array.from(fileInput.files);

      if (this.imagenes.length + filesArray.length > 1) {
        alert(`Solo puedes cargar hasta 1 imagen. Actualmente tienes ${this.imagenes.length}.`);
        return;
      }

      for (const file of filesArray) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagenes.push(reader.result as string);
        };
        reader.readAsDataURL(file);

        const url = await UploadImage(file, 'eventos');
        if (url) {
          this.evento.eventImg.push(url);
        }
      }
    }
  }

  guardarEvento(eventoForm: NgForm) {
    if (!eventoForm.valid || this.evento.eventImg.length !== 1) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente y carga exactamente 1 imagen.';
      this.markFormFieldsAsTouched(eventoForm);
      return;
    }

    this.errorMessage = '';
    this.isSubmitting = true;

    this.eventService.createEvent(this.evento).subscribe({
      next: (response) => {
        console.log('Evento creado exitosamente:', response);
        Swal.fire('Evento creado exitosamente', response.msg, 'success')
        this.router.navigate(['/dashboardA'])
        this.resetForm(eventoForm);
      },
      error: (error) => {
        console.error('Error al crear el evento:', error);
        this.errorMessage = 'Ocurrió un error al guardar el evento. Por favor, intenta nuevamente.';
        this.isSubmitting = false;
      },
      complete: () => {
        console.log('Proceso de creación de evento completado.');
        this.isSubmitting = false;
      }
    });
  }

  markFormFieldsAsTouched(form: NgForm) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.imagenes = [];
    this.evento.eventImg = [];
    this.imagenesTouched = false;
    this.errorMessage = '';
  }
}