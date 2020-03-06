import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  API_URL = 'http://localhost:3000/api/loads';
  transform(img: string): any {

    if (!img) {
      return this.API_URL + '/XXXXX';
    }

    return this.API_URL + '/' + img;

  }

}
