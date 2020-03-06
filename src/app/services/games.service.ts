import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../interface/game';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubirArchivoService } from './subir-archivo.service';
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class GamesService {
  API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private subirArchivoService: SubirArchivoService) { }


  creadGame(game: Game) {
    return this.http.post(`${this.API_URL}/games`, game);
  }
  readGames() {
    return this.http.get(`${this.API_URL}/games`)
      .pipe(map((resp: any) => {
        console.log(resp.Games);
        // Swal.fire({
        //   title: 'Juego Agregado Correctamente',
        //   icon: 'success',
        //   focusConfirm: false,
        //   confirmButtonText:
        //     'Cerrar'
        // })
        return resp.Games;
      }));
  }

  updateGame(id: number, game: Game): Observable<Game> {
    return this.http.put(`${this.API_URL}/games/${id}`, game);
  }

  deleteGame(id: number) {
    return this.http.delete(`${this.API_URL}/games/${id}`);
  }

  readGameOne(id: number) {
    return this.http.get(`${this.API_URL}/games/${id}`)
      .pipe(map((resp: any) => {
        return resp.Game[0];
      }));
  }



  async guardarImagen(archivo: File, title: string, imagen?: string): Promise<any> {

    try {
      return await (await this.subirArchivoService.subirArchivo(archivo, title, imagen));
    }
    catch (err) {
      console.error(err);
    }
  }
}
