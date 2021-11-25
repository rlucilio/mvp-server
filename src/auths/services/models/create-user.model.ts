import * as bCrypt from 'bcrypt';
import { saltOrRounds } from 'src/shared/consts';

type TypeUser = 'BENEFIT' | 'PROVIDER';

export class CreateUserModel {
  name: string;
  mail: string;
  type: TypeUser;
  birthDate: Date;
  private _pass: string;

  get pass(): string {
    return this._pass;
  }

  set pass(value: string) {
    this._pass = bCrypt.hashSync(value, saltOrRounds);
  }
}
