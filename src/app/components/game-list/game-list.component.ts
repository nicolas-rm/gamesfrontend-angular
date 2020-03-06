import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { Game } from '../../interface/game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  img1 = '../../../assets/img/976690.jpg';
  img2 = '../../../assets/img/meondesk.jpg';
  games: any = [];
  readError: boolean;
  constructor(private gamesService: GamesService) {
    // if (this.games.length >= 0) {
    //   this.readError = false;
    // } else {
    //   this.readError = true;
    // }
  }

  ngOnInit(): void {
    this.readGames();

  }

  readGames() {
    this.gamesService.readGames().subscribe(
      res => {
        this.games = res;
        if (this.games.length >= 0) {
          this.readError = false;
        } else {
          this.readError = true;
        }
      },
      err => {
        console.log(err.code)
      }
    );
  }

  eliminar(id: number) {
    console.log(id);
    this.gamesService.deleteGame(id).subscribe(
      result => {
        console.log(result);
        this.readGames();
      },
      err => {
        console.error(err);
      });
  }

  editar(id: number) {
    console.log(id);
  }



}
