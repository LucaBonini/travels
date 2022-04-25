import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user',
  EDITOR = 'editor'
}


@Entity()
@ObjectType()
export class Role {

  @PrimaryGeneratedColumn('uuid')
  @Field(type => String)
  id: string

  @Column()
  @Field(type => String)
  name: RoleEnum
}