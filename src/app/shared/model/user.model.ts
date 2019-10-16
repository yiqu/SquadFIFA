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
    this.user.firstName = "Not set";
    this.user.lastName = "Not set";
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
  constructor(public matches: number = 0, public seasons: number = 0, public wins: number = 0, 
    public draws: number = 0) {
  }
}

export interface IUserResponse {
  name: string
}