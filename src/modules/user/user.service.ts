import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
      omit: {
        password: true,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      omit: {
        password: true,
      },
    });
  }

  async findOne(id: UUID) {
    const findedUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      omit: {
        password: true,
      },
    });

    if (!findedUser) {
      throw new NotFoundException('User not found', {
        cause: new Error(),
        description: 'User not found',
      });
    }

    return findedUser;
  }

  async update(id: UUID, updateUserDto: UpdateUserDto) {
    const findedUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!findedUser) {
      throw new NotFoundException('User not found', {
        cause: new Error(),
        description: 'User not found',
      });
    }

    if (findedUser.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Old password is wrong', {
        cause: new Error(),
        description: 'Old password is wrong',
      });
    }

    return this.prisma.user.update({
      omit: {
        password: true,
      },
      where: {
        id: id,
      },
      data: {
        version: findedUser.version + 1,
        password: updateUserDto.newPassword,
      },
    });
  }

  async remove(id: UUID) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
