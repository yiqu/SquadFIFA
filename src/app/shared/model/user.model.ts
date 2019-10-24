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
    public firstName: string = "", 
    public lastName: string = "",
    public avatar: string,
    public logIns: UserLogins[]) {
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
  }
}

export interface IUserResponse {
  name: string
}