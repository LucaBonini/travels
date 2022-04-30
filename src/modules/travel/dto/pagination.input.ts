import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';

export enum SortableFields {
  NAME = 'name',
  SLUG = 'slug'
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC'
}

registerEnumType(SortableFields, {
  name: 'SortableFields'
});

registerEnumType(Order, {
  name: 'Order'
});

@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 1, nullable: true })
  page: number;

  @Field(() => Int, { defaultValue: 10, nullable: true })
  pageSize: number;

  @Field(() => String, { nullable: true })
  slug?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  numberOfDays?: number;

  @Field(() => SortableFields, { nullable: true })
  orderBy?: SortableFields;

  @Field(() => Order, { defaultValue: Order.ASC })
  sort: Order;
}
