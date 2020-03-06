import { Component, OnInit } from '@angular/core';
import { Game } from '../../interface/game';
import { GamesService } from '../../services/games.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {
  img: string = null;
  imgDefault: any = '../../../assets/img/default.jpg';


  imagenSubir: File;
  imagenTemp: string = '';

  edit: boolean = false;

  game: Game = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  };

  constructor(private gamesServices: GamesService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activeRoute.snapshot.params;
    console.log(params);
    if (params.id) {
      this.gamesServices.readGameOne(params.id).subscribe(
        result => {
          console.log(result);
          this.game.id = result.ID;
          this.game.title = result.TITLE;
          this.game.description = result.DESCRIPTION;
          this.game.image = result.IMAGE;
          this.game.created_at = result.CREATED_AT;
          // this.game = result;
          console.log('GAME');
          // console.log(this.game);
          this.edit = true;
        },
        err => {
          console.error(err);
        });
    }
  }


  seleccionImage(event: any) {
    let archivo: File = event.target.files[0];
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result.toString();

  }


  async newGame() {


    this.game.image = (await this.gamesServices.guardarImagen(this.imagenSubir, this.game.title));
    this.gamesServices.creadGame(this.game).subscribe(result => {
      console.log(result);
      this.router.navigate(['/games']);
    },
      err => {
        console.error(err);
      }
    );

  }

  async updateGame() {
    console.log(this.game);
    delete this.game.created_at;
    this.game.image = (await this.gamesServices.guardarImagen(this.imagenSubir, this.game.title,this.game.image));
    this.gamesServices.updateGame(this.game.id, this.game).subscribe(result => {
      console.log(result);
    },
      err => {
        console.error(err);
      }
    );;
  }


}
