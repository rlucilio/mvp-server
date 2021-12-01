type TypeUser = 'BENEFIT' | 'PROVIDER';

export class CreateUserModel {
  constructor(
    public name: string,
    public email: string,
    public type: TypeUser,
    public key: string,
    public specialty: string,
  ) {}
}
