type TypeUser = 'BENEFIT' | 'PROVIDER';

export class CreateUserModel {
  constructor(
    public name: string,
    public mail: string,
    public type: TypeUser,
    public birthDate: Date,
  ) {}
}
