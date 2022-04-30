import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  ValidateNested,
  IsArray,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

// @ArgsType()
@InputType()
export class UserCredentialsDto {
  @MinLength(4)
  @MaxLength(30)
  @IsEmail()
  @Field((type) => String)
  email: string;

  @MinLength(8)
  @MaxLength(20)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  @Field((type) => String)
  password: string;
}
