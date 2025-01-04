import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Product } from '../../schemas/product.schema'

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec()
  }

  async search(query: string): Promise<Product[]> {
    return this.productModel
      .find({
        $or: [
          { Title: { $regex: query, $options: 'i' } },
          { VariantSKU: { $regex: query, $options: 'i' } },
          { Handle: { $regex: query, $options: 'i' } },
        ],
      })
      .exec()
  }

  async create(product: Partial<Product>): Promise<Product> {
    const createdProduct = new this.productModel(product)
    return createdProduct.save()
  }
}
