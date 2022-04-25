import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user',
  EDITOR = 'editor'
}


@Entity()
export class Role {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: RoleEnum
}