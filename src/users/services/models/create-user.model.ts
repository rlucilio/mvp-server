type TypeUser = 'BENEFIT' | 'PROVIDER';

export class CreateUserModel {
  constructor(
    public name: string,
    public email: string,
    public type: TypeUser,
    public birthDate: Date,
    public key: string,
    public phone: string,
  ) {}
}
