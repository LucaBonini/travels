import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Moods {
  @Field(() => Int)
  nature: number;
  @Field(() => Int)
  relax: number;
  @Field(() => Int)
  history: number;
  @Field(() => Int)
  culture: number;
  @Field(() => Int)
  party: number;
}

@ObjectType()
@Entity()
export class Travel {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => Boolean)
  @Column()
  isPublic: boolean

  @Field(() => String, { description: 'Example field (placeholder)' })
  slug: string;

  @Field(() => String)
  @Column()
  name: string

  @Field(() => String)
  @Column()
  description: string

  @Field(() => Int)
  @Column()
  nDays: number

  @Field(() => Moods)
  @Column('jsonb')
  moods: Moods

}
