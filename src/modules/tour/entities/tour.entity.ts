import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'src/modules/auth/entities/user.entity';
import { Travel } from 'src/modules/travel/entities/travel.entity';
import { AfterInsert, AfterUpdate, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Traveler } from './traveler.entity';

@ObjectType()
@Entity()
export class Tour {
  
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => Travel)
  @ManyToOne(() => Travel, travel => travel.tours,  {onDelete: 'CASCADE'})
  travel: Travel

  @Field(() => String)
  @Column({ unique: true })
  name: string

  @Field(() => Date)
  @Column()
  startingDate: Date

  @Field(() => Date)
  @Column()
  endingDate: Date

  @Field(() => Int)
  @Column()
  price: number

  // TODO set travelers
  @Field(() => [Traveler])
  @ManyToMany(() => Traveler, traveler => traveler.tours, {eager: true, cascade: true})
  @JoinTable()
  travelers: Traveler[]

  @AfterInsert()
  logInsert() {
    console.log('Tour added');
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Tour updated');
  }
}
