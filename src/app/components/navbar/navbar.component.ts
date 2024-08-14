import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgStyle, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() background: string = '#55575A'
}
