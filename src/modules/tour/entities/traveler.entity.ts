import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tour } from "./tour.entity";

@Entity()
@ObjectType()
export class Traveler {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Column()
  @Field(() => String)
  fullname: string

  @Column()
  @Field(() => String)
  email: string

  @ManyToMany(() => Tour, tour => tour.travelers)
  tours: Tour[]
}