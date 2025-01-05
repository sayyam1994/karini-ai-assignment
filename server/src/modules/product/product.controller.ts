import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { ProductService } from './product.service'
import { Product } from 'src/schemas/product.schema'

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  async findAll() {
    return this.productsService.findAll()
  }

  @Get('search')
  async search(@Query('q') query: string) {
    return this.productsService.search(query)
  }
}
