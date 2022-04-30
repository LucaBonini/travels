import { UseGuards, UsePipes } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { User } from './entities/user.entity';
import { CurrentUser } from './decorators/get-user.decorator';
import { GqlAuthGuard } from './guard/gql-auth.guard';
import { LoginResponse } from './types/login-response.type';
import { Roles } from './decorators/role.decorator';
import { RoleEnum } from './entities/role.entity';
import { RolesGuard } from './guard/role.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user) {
    return user;
  }

  @Mutation(() => Boolean)
  @Roles(RoleEnum.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  createUser(@Args('userCredentialsDto') userCredentialsDto: UserCredentialsDto) {
    return this.authService.signUp(userCredentialsDto);
  }

  @Mutation(() => LoginResponse)
  signIn(@Args('userCredentialsDto') userCredentialsDto: UserCredentialsDto) {
    return this.authService.signIn(userCredentialsDto);
  }

  // create an ADMIN. for dev purpose only
  @Mutation(() => Boolean)
  // @UseGuards(AuthGuard())
  signUp(@Args('userCredentialsDto') userCredentialsDto: UserCredentialsDto) {
    return this.authService.signUp(userCredentialsDto);
  }
}
