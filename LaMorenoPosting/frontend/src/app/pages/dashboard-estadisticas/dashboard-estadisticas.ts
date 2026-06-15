import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Chart, registerables } from 'chart.js';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-estadisticas',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './dashboard-estadisticas.html',
  styleUrl: './dashboard-estadisticas.css'
})
export class DashboardEstadisticas implements OnInit, AfterViewInit {

  @ViewChild('graficoPubUsuario') graficoPubUsuario!: ElementRef;
  @ViewChild('graficoComentariosDia') graficoComentariosDia!: ElementRef;
  @ViewChild('graficoComentariosPub') graficoComentariosPub!: ElementRef;

  desde = '';
  hasta = '';
  charts: any[] = [];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (!this.auth.esAdmin()) {
      this.router.navigate(['/publicaciones']);
    }
  }

  ngAfterViewInit() {
    this.cargarGraficos();
  }

  private headers() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  cargarGraficos() {
    this.charts.forEach(c => c.destroy());
    this.charts = [];

    const params = this.desde && this.hasta
      ? `?desde=${this.desde}&hasta=${this.hasta}`
      : '';

    this.http.get<any[]>(
      `${environment.apiUrl}/estadisticas/publicaciones-por-usuario${params}`,
      { headers: this.headers() }
    ).subscribe(data => {
      const chart = new Chart(this.graficoPubUsuario.nativeElement, {
        type: 'bar',
        data: {
          labels: data.map(d => d._id),
          datasets: [{
            label: 'Publicaciones por usuario',
            data: data.map(d => d.total),
            backgroundColor: '#00cfff55',
            borderColor: '#00cfff',
            borderWidth: 1
          }]
        },
        options: {
          plugins: { legend: { labels: { color: '#c8e8ff' } } },
          scales: {
            x: { ticks: { color: '#c8e8ff' }, grid: { color: '#1a2a4a' } },
            y: { ticks: { color: '#c8e8ff' }, grid: { color: '#1a2a4a' } }
          }
        }
      });
      this.charts.push(chart);
    });

    this.http.get<any[]>(
      `${environment.apiUrl}/estadisticas/comentarios-por-dia${params}`,
      { headers: this.headers() }
    ).subscribe(data => {
      const chart = new Chart(this.graficoComentariosDia.nativeElement, {
        type: 'line',
        data: {
          labels: data.map(d => d._id),
          datasets: [{
            label: 'Comentarios por día',
            data: data.map(d => d.total),
            borderColor: '#7c3aed',
            backgroundColor: '#7c3aed22',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          plugins: { legend: { labels: { color: '#c8e8ff' } } },
          scales: {
            x: { ticks: { color: '#c8e8ff' }, grid: { color: '#1a2a4a' } },
            y: { ticks: { color: '#c8e8ff' }, grid: { color: '#1a2a4a' } }
          }
        }
      });
      this.charts.push(chart);
    });

    this.http.get<any[]>(
      `${environment.apiUrl}/estadisticas/comentarios-por-publicacion${params}`,
      { headers: this.headers() }
    ).subscribe(data => {
      const chart = new Chart(this.graficoComentariosPub.nativeElement, {
        type: 'doughnut',
        data: {
          labels: data.map(d => d._id),
          datasets: [{
            label: 'Comentarios por publicación',
            data: data.map(d => d.total),
            backgroundColor: ['#00cfff', '#7c3aed', '#39ff14', '#ff6b35', '#ff4444']
          }]
        },
        options: {
          plugins: { legend: { labels: { color: '#c8e8ff' } } }
        }
      });
      this.charts.push(chart);
    });
  }
}