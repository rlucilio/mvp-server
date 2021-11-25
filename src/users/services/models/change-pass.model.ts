export class ChangePassModel {
  constructor(
    public email: string,
    public newPass: string,
    public oldPass: string,
  ) {}
}
