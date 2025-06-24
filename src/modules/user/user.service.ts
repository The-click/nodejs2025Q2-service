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
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
      },
      omit: {
        password: true,
      },
    });

    return {
      ...user,
      updatedAt: +new Date(user.updatedAt),
      createdAt: +new Date(user.createdAt),
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      omit: {
        password: true,
      },
    });

    return users.map((user) => ({
      ...user,
      updatedAt: +new Date(user.updatedAt),
      createdAt: +new Date(user.createdAt),
    }));
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

    return {
      ...findedUser,
      updatedAt: +new Date(findedUser.updatedAt),
      createdAt: +new Date(findedUser.createdAt),
    };
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

    const updatedUser = await this.prisma.user.update({
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

    return {
      ...updatedUser,
      updatedAt: +new Date(updatedUser.updatedAt),
      createdAt: +new Date(updatedUser.createdAt),
    };
  }

  async remove(id: UUID) {
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

    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
