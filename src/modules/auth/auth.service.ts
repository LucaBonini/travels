import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { RoleEnum } from './entities/role.entity';
import { RolesRepository } from './repositories/roles.repository';
import { UsersRepository } from './repositories/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtInterface, JwtPayload } from './interfaces/jwt-interface';
import { LoginResponse } from './types/login-response.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private readonly usersRepository: UsersRepository,
    @InjectRepository(RolesRepository) private readonly rolesRepository: RolesRepository,
    private readonly jwtService: JwtService
  ) {}

  async signUp(UserCredentialsDto: UserCredentialsDto) {
    const role = await this.rolesRepository.getByName(RoleEnum.USER);
    if (!role) {
      throw new NotFoundException('role not found');
    }

    const { email, password } = UserCredentialsDto;
    await this.usersRepository.createUser(email, password, [role]);
    return true;
  }

  async signIn(UserCredentialsDto: UserCredentialsDto): Promise<LoginResponse> {
    const { email, password } = UserCredentialsDto;
    const user = await this.usersRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {
        id: user.id
      };
      const accessToken = await this.jwtService.sign(payload);
      return {
        accessToken
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
