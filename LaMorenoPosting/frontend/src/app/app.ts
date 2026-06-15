import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { AuthService } from './services/auth';
import { SessionService } from './services/session.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar,CommonModule,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');



  constructor(
    public auth: AuthService,
    public session: SessionService,
    private cdr: ChangeDetectorRef
  ) { }
}
