/* export class User {
    constructor(public id: string, 
      public name: string, 
      public username: string, 
      public email: string, 
      public password: string, 
      public type: string, 
      public created_at: Date, 
      public bought_at: Date
    ) {}
} */

/*
@User

  {
    "id": "5bdb05ac8f88",
    "name": "Anthony Cursewl",
    "username": "anthonycursewl",
    "email": "zerpaanthony.wx@breadriuss.com",
    "password": "arroz1214",
    "type": "arrozitouwu",
    "created_at": "2025-02-26T21:22:32.759Z",
    "bought_at": "2025-02-26T21:22:32.759Z"
  }

*/

// @ts-nocheck
type UserType = {
    id: string,
    name: string,
    username: string,
    email: string,
    password: string,
    type: string,
    created_at: Date,
    bought_at: Date
}

export class User {
  constructor(
    public id: string,
    public name: string,
    public username: string,
    public email: string,
    public password: string,
    public type: string,
    public created_at: Date,
    public bought_at: Date
  ) {}
}

export class UserProfile {
  constructor(
    public id: string,
    public name: string,
    public username: string,
    public email: string,
    public type: string,
    public created_at: Date,
    public bought_at: Date
  ) {}
}