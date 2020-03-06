import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {
  API_URL = 'http://localhost:3000/api';
  constructor() { }

  subirArchivo(archivo: File, title: string, imagen?: string) {

    return new Promise((resolve, reject) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append('archivo', archivo, archivo.name);

      xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {

          if (xhr.status === 200) {
            console.log('Imagen subida');
            resolve(JSON.parse(xhr.response).name);
          } else {
            console.log('Fallo la subida');
            reject(xhr.response);
          }

        }
      };

      let url = `${this.API_URL}/uploads/${title}/${imagen}`;

      xhr.open('PUT', url, true);
      xhr.send(formData);

    });
  }

}
