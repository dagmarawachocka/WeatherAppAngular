import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'kelvinToCelsius',
  standalone: true
})
export class KelvinToCelsiusPipe implements PipeTransform {

  transform(value: number): number {
    if (value) {
      return value - 273.15;
    } else {
      return 0;
    }
  }
}
