import {Args, Query, Resolver, Subscription, Mutation} from '@nestjs/graphql';
import {Cart} from './model/cart.model';
import {AppService} from './app.service';
import {PubSub} from 'graphql-subscriptions';
import {Product} from './model/product.model';

const pubSub = new PubSub();

@Resolver(() => Cart)
export class AppResolver {
  constructor(private readonly appService: AppService) {
  }

  @Query(returns => Cart)
  async getCart(): Promise<Cart> {
    return await this.appService.getCart();
  }

  @Subscription(returns => Product)
  productAdded() {
    return pubSub.asyncIterator('productAdded');
  }

  @Mutation(returns => Product)
  async addNewProduct(
    @Args({ name: 'name', type: () => String }) name: string,
  ): Promise<Product> {
    const product = await this.appService.addProductToCart(name);
    await  pubSub.publish('productAdded', {productAdded: product});
    return product;
  }
}
