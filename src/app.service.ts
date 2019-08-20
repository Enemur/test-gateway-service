import { Injectable } from '@nestjs/common';
import {Cart} from './model/cart.model';
import {Product} from './model/product.model';

@Injectable()
export class AppService {
  private readonly cart = new Cart();

  async addProductToCart(name: string): Promise<Product> {
    const product = new Product({name});
    this.cart.products.push(product);
    return product;
  }

  async getCart(): Promise<Cart> {
    return this.cart;
  }
}
