import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  scrollOffset = 0;

  correoBicitour: string = 'bicitourclub@gmail.com';

  onScroll(event:Event){
    const target = event.target as HTMLElement
    this.scrollOffset = target.scrollLeft;

    const movingImg = document.querySelector('.moving-image') as HTMLElement

    if (movingImg) {
      movingImg.style.transform = `translateX(${this.scrollOffset * 1.5}px)`;
    }
  }

}
