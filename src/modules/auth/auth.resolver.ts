import { UseGuards, UsePipes } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { User } from './entities/user.entity';
import { CurrentUser } from './get-user.decorator';
import { LoginResponse } from './types/login-response.type';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService
  ){}

  @Query(returns => User)
  me(
    @CurrentUser() user
  ) {
    return user
  }

  @Mutation(returns => LoginResponse)
  // @UseGuards(AuthGuard())
  signIn(
    @Args() userCredentialsDto: UserCredentialsDto
  ) {
    return this.authService.signIn(userCredentialsDto);
  }

  @Mutation(returns => Boolean)
  // @UseGuards(AuthGuard())
  signUp(
    @Args() userCredentialsDto: UserCredentialsDto
  ) {
    return this.authService.signUp(userCredentialsDto);
  }
}
