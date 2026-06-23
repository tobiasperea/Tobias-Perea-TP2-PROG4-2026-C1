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
  errorMsg = '';

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



    this.errorMsg = '';

    if (!this.nuevoUsuario.nombre ||
      !this.nuevoUsuario.apellido ||
      !this.nuevoUsuario.email ||
      !this.nuevoUsuario.username ||
      !this.nuevoUsuario.password ||
      !this.nuevoUsuario.fechaNacimiento) {

      this.errorMsg = 'Completá todos los campos obligatorios';
      return;
    }
    if (this.nuevoUsuario.password.length < 8) {
      this.errorMsg = 'La contraseña debe tener al menos 8 caracteres';
      return;
    }

    if (!this.nuevoUsuario.email.includes('@')) {
      this.errorMsg = 'Ingresá un correo válido';
      return;
    }

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
      error: (err) => {
        this.errorMsg =
        err.error?.message || 'No se pudo crear el usuario';

        this.cargando = false;
        this.cdr.detectChanges();
      }
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