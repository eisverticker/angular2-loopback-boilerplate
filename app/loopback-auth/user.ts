export class User{
  constructor(
    public name: string,
    public mail: string,
    public password: string,
    public roles: Array<string> = []
  ){};

  static createEmptyUser(): User{
    return new User("","","",[]);
  }

  static createGuest(): User{
    return new User("Guest", "", "", []);
  }

  static isGuest(user: User){
    return user.name == "Guest";
  }
}
