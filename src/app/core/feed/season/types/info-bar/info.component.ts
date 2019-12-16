import { Component, OnInit, Input } from '@angular/core';
import { ISeason } from 'src/app/shared/model/season.model';
import { User } from 'src/app/shared/model/user.model';

@Component({
  selector: 'season-info-bar',
  templateUrl: 'info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoBarComponent implements OnInit {

  @Input()
  seasonInfo: ISeason;

  playerOne: User;
  playerTwo: User;
  createdDateDisplay: string = "FROMNOW";
  dateTooltipSuffix: string = ". Click to see full date";

  constructor() {
  }

  ngOnInit() {
    this.playerOne = this.seasonInfo.player1 ? this.seasonInfo.player1 : new User();
    this.playerTwo = this.seasonInfo.player2 ? this.seasonInfo.player2 : new User();
  }

}