import {Field, Int, ObjectType} from 'type-graphql';

@ObjectType()
export class Product {
  constructor(data: Partial<Product>) {
    Object.assign(this, data);
  }

  @Field()
  name!: string;
}
