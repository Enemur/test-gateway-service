import {Field, ObjectType} from 'type-graphql';
import {Product} from './product.model';

@ObjectType()
export class Cart {
  constructor() {
    this.products = [];
  }

  @Field(type => [Product])
  products!: Product[];
}
