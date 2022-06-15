import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Tour } from '../../../modules/tour/entities/tour.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  id: string;

  @Field(() => Boolean)
  @Column()
  isPublic: boolean;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Column()
  slug: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => Int)
  @Column()
  nDays: number;

  @Field(() => Int)
  @Column()
  nNights: number;

  @Field(() => Moods)
  @Column('jsonb')
  moods: Moods;

  @Field(() => [Tour], { nullable: true })
  @OneToMany(() => Tour, (tour) => tour.travel, { eager: true })
  tours: Tour[];
}
