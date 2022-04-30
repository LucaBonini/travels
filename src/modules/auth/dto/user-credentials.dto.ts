import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  ValidateNested,
  IsArray,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { RoleEnum } from '../entities/role.entity';

registerEnumType(RoleEnum, {
  name: 'RoleEnum',
});

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

  @Field(type => [RoleEnum], {nullable: true})
  roles: RoleEnum[]
}
