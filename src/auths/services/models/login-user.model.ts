export class UserLoginModel {
  constructor(
    public mail: string,
    public pass: string,
    public firstAccess: boolean,
  ) {}
}
