import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
@ObjectType()
export class User {
  @Field((type) => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field((type) => String)
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field((type) => [Role])
  @ManyToMany((_type) => Role, (role) => role.user, { eager: true })
  @JoinTable()
  roles: Role[];
}
