import { User } from './user.model';
import * as _ from 'lodash';

export interface ISeason {
  hashKey: string;
  player1: User;
  player2: User;
  player1Record: SeasonRecord;
  player2Record: SeasonRecord;
  gamesTotal: number;
  owners: User[];
  controllers: User[];
  games: IGame[];
  winner: User | any;
  startDate: number;
  endDate: number;
  pending: string;
  archived: boolean;
  completed: boolean;
  editing: boolean;
  lastEdited: Editor;
  title: string;
}

export class Season implements ISeason {

  constructor(
    public hashKey: string = null,
    public player1: User,
    public player2: User,
    public player1Record: SeasonRecord,
    public player2Record: SeasonRecord,
    public gamesTotal: number = 8,
    public owners: User[] = [],
    public controllers: User[] = [],
    public games: IGame[] = [],
    public winner: User | any,
    public startDate: number = 0,
    public endDate: number = 0,
    public pending: string = "TRUE",
    public archived: boolean = false,
    public completed: boolean = false,
    public editing: boolean = false,
    public lastEdited: Editor,
    public title: string) {
      
      this.hashKey = hashKey;
      this.player1 = new User(player1.user, player1.admin, player1.isUser, player1.data, player1.hashKey);
      this.player2 = new User(player2.user, player2.admin, player2.isUser, player2.data, player2.hashKey);

      this.player1Record = player1Record ? player1Record : new SeasonRecord(0, 0, 0, this.player1);
      this.player2Record = player2Record ? player2Record : new SeasonRecord(0, 0, 0, this.player2);

      this.gamesTotal = gamesTotal ? gamesTotal : 8;

      this.owners = [];
      for (let i =0; i<owners.length; i++) {
        this.owners.push(new User(owners[i].user, owners[i].admin, 
          owners[i].isUser, owners[i].data, owners[i].hashKey));
      }

      this.controllers = [];
      for (let i =0; i<controllers.length; i++) {
        this.controllers.push(new User(controllers[i].user, controllers[i].admin, 
          controllers[i].isUser, controllers[i].data, controllers[i].hashKey));
      }

      this.games = [];
      if (games.length > 0) {
        games.forEach((game: Game) => {
          if (game) {
            this.games.push(new Game(game.controllers, game.finished, game.datePlayed, game.gameWinner));
          }
        });
      } else {
        let gameCs: IGameController[] = [];
        gameCs.push(new GameController(0, [], undefined, this.player1));
        gameCs.push(new GameController(0, [], undefined, this.player2));
        this.games.push(new Game(gameCs, false, 0, undefined));
      }

      this.startDate = startDate ? startDate : new Date().getTime();

      this.endDate = endDate ? endDate : 0;
      
      if (pending) {
        this.pending = pending;
      } else {
        const result = this.owners.some((user: User, index) => {
          return user.admin;
        });
        this.pending = result ? "TRUE" : "FALSE";
      }

      this.archived = archived;
      
      if (this.games.length >= this.gamesTotal) {
        this.completed = true;
      } else {
        this.completed = false;
      }

      this.editing = editing;
      this.lastEdited = lastEdited ? lastEdited : new Editor(lastEdited.date, lastEdited.editor);

      this.winner = winner ? 
        new User(winner.user, winner.admin, winner.isUser, winner.data, winner.hashKey) : this.getSeasonWinner();
  }


  /**
   * Calculate season winner
   */
  public getSeasonWinner(): User | any {
    this.setSeasonWinner();
    return this.winner;
  }

  private setSeasonWinner(): void {
    //let winner: User | any;
    const p1: User = this.player1;
    const p2: User = this.player2;

    // LOOP THROUGH EACH GAME *****
    this.games.forEach((game: Game) => {
      let p1Goals: number = 0;
      let p2Goals: number = 0;
      game.controllers.forEach((controller: GameController) => {
        // add up the goals scored
        if (controller.user.user.id === p1.user.id) {
          p1Goals = p1Goals + controller.goalsScored;
        } else if (controller.user.user.id === p2.user.id) {
          p2Goals = p2Goals + controller.goalsScored;
        }
      });

      // set players records
      if (p1Goals > p2Goals) {
        this.player1Record.wins =+ 1;
        this.player2Record.losses =+ 1;
      } else if (p1Goals === p2Goals) {
        this.player1Record.draws =+ 1;
        this.player2Record.draws =+ 1;
      } else {
        this.player2Record.wins =+ 1;
        this.player1Record.losses =+ 1;
      }
      // end of loop of all games
    });

    // decide who won the season
    if (this.getCompleted()) {
      if (this.player1Record.wins > this.player2Record.wins) {
        this.winner = p1;
      } else if (this.player2Record.wins > this.player1Record.wins) {
        this.winner = p2;
      } else {
        this.winner = "DRAW";
      }
    } else {
      this.winner = "ONGOING";
    }
    
  }
  
  public getPlayerById(userId: string) {
    if (userId === this.player1.user.id) {
      return this.player1;
    } else if (userId === this.player2.user.id) {
      return this.player2;
    }
    return null
  }

  public getRecordForPlayer(userId: string): SeasonRecord {
    if (userId === this.player1Record.user.user.id) {
      return this.player1Record;
    } else if (userId === this.player2Record.user.user.id) {
      return this.player2Record;
    }
    return null;
  }

  /**
   * If season is completed
   */
  public getCompleted(): boolean {
    if (this.games.length >= this.gamesTotal) {
      return true;
    }
    return false;
  }
}

export interface IGame {
  controllers: IGameController[];
  finished: boolean;
  datePlayed: number;
  gameWinner?: IGameController;
}

export class Game implements IGame {
  constructor(public controllers: IGameController[], public finished: boolean = false, public datePlayed: number = 0, 
    public gameWinner?: IGameController) {
      this.controllers = controllers;
      this.finished = finished;
      this.datePlayed = datePlayed;
      this.gameWinner = gameWinner;
  }
}

export interface IGameController {
  goalsScored: number;
  goalDetails: GoalDetail[];
  teamName: string;
  user: User;
}

export class GameController implements IGameController {
  constructor(public goalsScored: number = 0, 
    public goalDetails: GoalDetail[] = [], 
    public teamName: string, 
    public user: User) {
      
      this.goalsScored = +goalsScored;
      this.goalDetails = [];
      goalDetails.forEach((goalDeet: GoalDetail) => {
        this.goalDetails.push(new GoalDetail(goalDeet.goalCount, goalDeet.goalScorer, goalDeet.goalTime));
      })
      this.teamName = teamName ? (teamName + "") : "Not set";
      this.user = new User(user.user, user.admin, user.isUser, user.data, user.hashKey);
  }
}


export class GoalDetail {
  constructor(public goalCount: number, public goalScorer: string, public goalTime: string) {
  }
}

export class Editor {
  constructor(public date: number = 0, public editor: User) {
    this.date = date;
    this.editor = new User(editor.user, editor.admin, editor.isUser, editor.data, editor.hashKey);
  }
}


export class Team {
  constructor(public name: string, public controller: User) {
    this.name = name;
    this.controller = new User(controller.user, controller.admin, controller.isUser, controller.data, controller.hashKey);
  }
}

export class Score {
  constructor(public goalCount: GoalDetail, public controller: User, public team: Team) {
    this.goalCount = new GoalDetail(null, null, null);
    this.controller = new User(controller.user, controller.admin, controller.isUser, controller.data, controller.hashKey);
    this.team = new Team(team.name, team.controller);
  }
}

export class SeasonRecord {
  constructor(public wins: number = 0, public draws: number = 0, public losses: number = 0, public user: User){
  }
}