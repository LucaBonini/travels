import { createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "./entities/user.entity";

export const CurrentUser = createParamDecorator((_data, ctx: GqlExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
})