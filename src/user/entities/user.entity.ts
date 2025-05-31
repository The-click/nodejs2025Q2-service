import { Exclude } from 'class-transformer';
import { UUID } from 'crypto';

export class UserEntity {
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
