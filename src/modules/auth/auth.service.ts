import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { Role, RoleEnum } from './entities/role.entity';
import { RolesRepository } from './repositories/roles.repository';
import { UsersRepository } from './repositories/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtInterface, JwtPayload } from './interfaces/jwt-interface';
import { LoginResponse } from './types/login-response.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @InjectRepository(RolesRepository)
    private readonly rolesRepository: RolesRepository,
    private readonly jwtService: JwtService
  ) {}

  async signUp(userCredentialsDto: UserCredentialsDto) {
    let roles: Role[];
    // for dev purpose only
    if (!userCredentialsDto.roles) {
      roles = await this.rolesRepository.getByNames([RoleEnum.ADMIN]);
    } else {
      roles = await this.rolesRepository.getByNames(userCredentialsDto.roles);
    }
    if (roles.length < 1) {
      throw new NotFoundException('roles not found');
    }

    const { email, password } = userCredentialsDto;
    await this.usersRepository.createUser(email, password, roles);
    return true;
  }

  async signIn(userCredentialsDto: UserCredentialsDto): Promise<LoginResponse> {
    const { email, password } = userCredentialsDto;
    const user = await this.usersRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {
        id: user.id
      };
      const accessToken = await this.jwtService.sign(payload);
      return {
        accessToken
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
