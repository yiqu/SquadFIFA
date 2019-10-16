import { User } from './user.model';

export interface ISeason {
  hashKey: string;
  gamesTotal: number;
  owners: User[];
  player1: User;
  player2: User;
  results: IResult;
  winner: User;
  startDate: number;
  endDate: number;
  
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
  dates: number;
}

export class Game implements IGame {
  constructor(public teams: Team[], public scores: Score[], public dates: number) {
  }
}

export class Team {
  constructor(public name: string, public controller: User) {
  }
}

export class Score {
  constructor(public goalCount: GoalDetail, public controller: User) {
  }
}

export class GoalDetail {
  constructor(public goalCount: number, public goalScorer: string, public goalTime: string) {

  }
}