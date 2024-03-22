import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenAddress',
  standalone: true,
})
export class ShortenAddressPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    if (!value) return '';
    // Take the first 6 characters and the last 4 characters
    return `${value.substring(0, 6)}...${value.substring(37)}`;
  }
}
