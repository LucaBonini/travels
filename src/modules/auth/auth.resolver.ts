import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { UserCredentialsDto } from './dto/user-credentials.dto';

@Resolver()
export class AuthResolver {

  @Mutation()
  // @UseGuards(AuthGuard())
  signUp(
    @Args() UserCredentialsDto: UserCredentialsDto
  ) {

  }
}
