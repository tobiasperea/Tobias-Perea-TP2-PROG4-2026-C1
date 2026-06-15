import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './dashboard-usuarios.html',
  styleUrl: './dashboard-usuarios.css'
})
export class DashboardUsuarios implements OnInit {

  usuarios: any[] = [];
  mostrarFormulario = false;
  cargando = false;

  nuevoUsuario = {
    nombre: '',
    apellido: '',
    email: '',
    username: '',
    password: '',
    fechaNacimiento: '',
    descripcion: '',
    perfil: 'usuario'
  };

  constructor(
    private adminService: AdminService,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (!this.auth.esAdmin()) {
      this.router.navigate(['/publicaciones']);
      return;
    }
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.adminService.listarUsuarios().subscribe((res: any) => {
      this.usuarios = res;
      this.cdr.detectChanges();
    });
  }

  crearUsuario() {
    this.cargando = true;
    this.adminService.crearUsuario(this.nuevoUsuario).subscribe({
      next: () => {
        this.mostrarFormulario = false;
        this.nuevoUsuario = {
          nombre: '', apellido: '', email: '', username: '',
          password: '', fechaNacimiento: '', descripcion: '', perfil: 'usuario'
        };
        this.cargarUsuarios();
        this.cargando = false;
      },
      error: () => { this.cargando = false; }
    });
  }

  deshabilitar(id: string) {
    this.adminService.deshabilitarUsuario(id).subscribe(() => {
      this.cargarUsuarios();
    });
  }

  habilitar(id: string) {
    this.adminService.habilitarUsuario(id).subscribe(() => {
      this.cargarUsuarios();
    });
  }
}