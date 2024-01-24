import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metersToKilometers',
  standalone: true
})
export class MetersToKilometersPipe implements PipeTransform {

  transform(value: number): number {
    return value/10 * 36;
  }

}
