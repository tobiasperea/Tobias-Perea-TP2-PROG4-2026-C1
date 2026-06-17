import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncar', standalone: true })
export class TruncarPipe implements PipeTransform {
  transform(texto: string, limite = 100): string {
    if (!texto) return '';
    if (texto.length <= limite) return texto;
    return texto.substring(0, limite) + '...';
  }
}