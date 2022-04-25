import { ArgsType } from "@nestjs/graphql"
import { Type } from "class-transformer"
import { IsEmail, IsString, ValidateNested, IsArray, MinLength, MaxLength, Matches } from "class-validator"

@ArgsType()
export class UserCredentialsDto {

  @MinLength(4)
  @MaxLength(20)
  @IsEmail()
  email: string

  @MinLength(8)
  @MaxLength(20)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak'
  })
  password: string
}