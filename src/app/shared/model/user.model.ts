/**
 * User model
 */
export class User {
  constructor(
    public user: UserInfo = null, 
    public admin: boolean = false, 
    public isUser: boolean = false,
    public data: UserData = new UserData(),
    public hashKey: string = null) {
      this.admin = (admin == null) ? false : admin;
      this.data = new UserData(data.matchesPlayed, data.seasonsPlayed, data.wins, data.draws, data.losses,
        data.mostUsedTeam, data.favoritePlayer, data.totalGoalsScored, data.totalGoalsConceded);
  }

  public setUser(u: UserInfo) {
    this.user = u;
  }

  public setNoName() {
    this.user.firstName = "Johnny";
    this.user.lastName = "Appleseed";
  }

  public isUserSet() {
    return this.user.id ? true : false;
  }

}

export class UserInfo {
  constructor(public id: string = null,
    public firstName: string = null, 
    public lastName: string = null,
    public avatar: string = "",
    public logIns: UserLogins[] = []) {
      if (id == null || id == undefined) {
        this.id = "Unknown";
      }
      if (!firstName) {
        this.firstName = "Johnny";
      }
      if (!lastName) {
        this.lastName = "Appleseed";
      }
  }
}

export class UserLogins {
  constructor(public date: number, public type: string) {
  }
}

export class UserData {
  constructor(
    public matchesPlayed: number = 0, 
    public seasonsPlayed: number = 0, 
    public wins: number = 0, 
    public draws: number = 0, 
    public losses: number = 0,
    public mostUsedTeam: any = null,
    public favoritePlayer: any = null,
    public totalGoalsScored: number = 0,
    public totalGoalsConceded: number = 0) {

      this.matchesPlayed = matchesPlayed ? matchesPlayed : 0;
      this.seasonsPlayed = seasonsPlayed ? seasonsPlayed : 0;
      this.wins = wins ? wins : 0;
      this.draws = draws ? draws : 0;
      this.losses = losses ? losses : 0;
      this.mostUsedTeam = mostUsedTeam ? mostUsedTeam : "None";
      this.favoritePlayer = favoritePlayer ? favoritePlayer : "None";
      this.totalGoalsScored = totalGoalsScored ? totalGoalsScored : 0;
      this.totalGoalsConceded = totalGoalsConceded ? totalGoalsConceded : 0;
  }
}

export interface IUserResponse {
  name: string
}