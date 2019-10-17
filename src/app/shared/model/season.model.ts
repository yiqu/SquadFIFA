import { User } from './user.model';

export interface ISeason {
  hashKey: string;
  gamesTotal: number;
  owners: User[];
  controllers: User[];
  results: IResult;
  winner: User;
  startDate: number;
  endDate: number;
  pending: string;
  archived: boolean;
  completed: boolean;
  lastEdited: Editor;
}

export class Season implements ISeason {
  readonly TOTAL_GAMES_PER_SEASON: number = 8;


  constructor(public hashKey: string = null,
    public gamesTotal: number = 0,
    public owners: User[] = [],
    public controllers: User[] = [],
    public results: IResult = new Result([], []),
    public winner: User,
    public startDate: number,
    public endDate: number,
    public pending: string = "TRUE",
    public archived: boolean = false,
    public completed: boolean = false,
    public lastEdited: Editor) {

      this.hashKey = hashKey;
      this.gamesTotal = gamesTotal;

      for (let i =0; i<owners.length; i++) {
        this.owners.push(new User(owners[i].user, owners[i].admin, 
          owners[i].isUser, owners[i].data, owners[i].hashKey));
      }

      for (let i =0; i<controllers.length; i++) {
        this.controllers.push(new User(controllers[i].user, controllers[i].admin, 
          controllers[i].isUser, controllers[i].data, controllers[i].hashKey));
      }

      this.results = results;
      this.winner = new User(winner.user, winner.admin, winner.isUser, winner.data, winner.hashKey);
      this.startDate = startDate ? startDate : new Date().getTime();
      this.endDate = null;
      
      if (pending) {
        this.pending = pending;
      } else {
        const result = this.owners.some((user: User, index) => {
          return user.admin;
        });
        this.pending = result ? "TRUE" : "FALSE";
      }

      this.archived = archived;
      
      if (this.results.games.length === this.TOTAL_GAMES_PER_SEASON) {
        this.completed = true;
      } else {
        this.completed = false;
      }

      this.lastEdited = new Editor(lastEdited.date, lastEdited.editor);
  }


  /**
   * Calculate season winner
   */
  getSeasonWinner(): User {
    return;
  }

  /**
   * If season is completed
   */
  getCompleted(): boolean {
    if (this.results.games.length > this.TOTAL_GAMES_PER_SEASON) {
      return true;
    }
    return false;
  }
}

export interface IResult {
  controllers: User[];
  games: IGame[];
}

export class Result implements IResult {
  constructor(public controllers: User[], public games: IGame[]) {
  }
}

export interface IGame {
  teams: Team[];
  scores: Score[];
  datePlayed: number;
}

export class Game implements IGame {
  constructor(public teams: Team[], public scores: Score[], public datePlayed: number) {
    teams.forEach((t: Team) => {
      this.teams.push(new Team(t.name, t.controller));
    });
    scores.forEach((s: Score) => {
      this.scores.push(new Score(s.goalCount, s.controller));
    });
    this.datePlayed = datePlayed;
  }
}

export class Team {
  constructor(public name: string, public controller: User) {
    this.name = name;
    this.controller = new User(controller.user, controller.admin, controller.isUser, controller.data, controller.hashKey);
  }
}

export class Score {
  constructor(public goalCount: GoalDetail, public controller: User) {
    this.goalCount = new GoalDetail(null, null, null);
    this.controller = new User(controller.user, controller.admin, controller.isUser, controller.data, controller.hashKey);
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