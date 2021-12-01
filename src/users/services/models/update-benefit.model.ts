export class UpdateBenefitModel {
  constructor(
    public oldEmail: string,
    public newEmail: string,
    public newPass: string,
    public name: string,
    public mobilePhone: string,
    public acceptTerm: boolean,
    public gender: string,
  ) {}
}
