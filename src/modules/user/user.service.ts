import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UUID } from 'crypto';

@Injectable()
export class UserService {
  private readonly users: UserEntity[] = [
    new UserEntity({
      id: crypto.randomUUID(),
      login: 'string',
      version: 1,
      createdAt: 2,
      updatedAt: 3,
      password: '1234',
    }),
  ];

  create(createUserDto: CreateUserDto) {
    console.log({ createUserDto });
    const currentTimeStamp = +new Date();
    const newUser: UserEntity = new UserEntity({
      ...createUserDto,
      id: crypto.randomUUID(),
      version: 1,
      createdAt: currentTimeStamp,
      updatedAt: currentTimeStamp,
    });

    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: UUID) {
    const findedUser = this.users.find((user) => user.id === id);

    if (!findedUser) {
      throw new NotFoundException('User not found', {
        cause: new Error(),
        description: 'User not found',
      });
    }

    return findedUser;
  }

  update(id: UUID, updateUserDto: UpdateUserDto) {
    const findedUser = this.findOne(id);

    if (findedUser.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Old password is wrong', {
        cause: new Error(),
        description: 'Old password is wrong',
      });
    }

    findedUser.password = updateUserDto.newPassword;
    findedUser.version += 1;
    findedUser.updatedAt = +new Date();

    return findedUser;
  }

  remove(id: UUID) {
    const findedUser = this.findOne(id);

    return this.users.splice(
      this.users.findIndex((user) => user.id === findedUser.id),
      1,
    );
  }
}
