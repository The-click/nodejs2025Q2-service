import { Exclude } from 'class-transformer';
import { UUID } from 'crypto';
import { IUser } from 'src/shared/types/entity';

export class UserEntity implements IUser {
  id: UUID;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(user: UserEntity) {
    Object.assign(this, user);
  }
}
