import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fechaRelativa', standalone: true })
export class FechaRelativaPipe implements PipeTransform {
  transform(fecha: string | Date): string {
    const ahora = new Date();
    const f = new Date(fecha);
    const diff = Math.floor((ahora.getTime() - f.getTime()) / 1000);

    if (diff < 60) return 'hace unos segundos';
    if (diff < 3600) return `hace ${Math.floor(diff / 60)} minutos`;
    if (diff < 86400) return `hace ${Math.floor(diff / 3600)} horas`;
    return `hace ${Math.floor(diff / 86400)} días`;
  }
}