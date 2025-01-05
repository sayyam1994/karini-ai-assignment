import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Product } from '../../schemas/product.schema'

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  private getCommonGroupStage() {
    return {
      $group: {
        _id: '$Handle',
        Handle: { $first: '$Handle' },
        Title: { $first: '$Title' },
        Body: { $first: '$Body' },
        Vendor: { $first: '$Vendor' },
        Type: { $first: '$Type' },
        Tags: { $first: '$Tags' },
        Option1Name: { $first: '$Option1Name' },
        Option1Value: { $first: '$Option1Value' },
        Option2Name: { $first: '$Option2Name' },
        Option2Value: { $first: '$Option2Value' },
        Option3Name: { $first: '$Option3Name' },
        Option3Value: { $first: '$Option3Value' },
        Variants: {
          $push: {
            VariantSKU: '$VariantSKU',
            VariantGrams: '$VariantGrams',
            VariantInventoryTracker: '$VariantInventoryTracker',
            VariantInventoryQty: '$VariantInventoryQty',
            VariantInventoryPolicy: '$VariantInventoryPolicy',
            VariantFulfillmentService: '$VariantFulfillmentService',
            VariantPrice: '$VariantPrice',
            VariantCompareAtPrice: '$VariantCompareAtPrice',
            ImageSrc: '$ImageSrc',
          },
        },
      },
    }
  }

  private getCommonProjectStage() {
    return {
      $project: {
        _id: 0,
        Handle: 1,
        Title: 1,
        Body: 1,
        Vendor: 1,
        Type: 1,
        Tags: 1,
        Option1Name: 1,
        Option1Value: 1,
        Option2Name: 1,
        Option2Value: 1,
        Option3Name: 1,
        Option3Value: 1,
        Variants: {
          $map: {
            input: {
              $reduce: {
                input: '$Variants',
                initialValue: [],
                in: {
                  $concatArrays: [
                    '$$value',
                    {
                      $cond: [
                        {
                          $and: [
                            { $ne: ['$$this.VariantSKU', ''] },
                            {
                              $not: {
                                $in: [
                                  '$$this.VariantSKU',
                                  '$$value.VariantSKU',
                                ],
                              },
                            },
                          ],
                        },
                        ['$$this'],
                        [],
                      ],
                    },
                  ],
                },
              },
            },
            as: 'variant',
            in: {
              VariantSKU: '$$variant.VariantSKU',
              VariantGrams: '$$variant.VariantGrams',
              VariantInventoryTracker: '$$variant.VariantInventoryTracker',
              VariantInventoryQty: '$$variant.VariantInventoryQty',
              VariantInventoryPolicy: '$$variant.VariantInventoryPolicy',
              VariantFulfillmentService: '$$variant.VariantFulfillmentService',
              VariantPrice: '$$variant.VariantPrice',
              VariantCompareAtPrice: '$$variant.VariantCompareAtPrice',
              Images: {
                $filter: {
                  input: '$Variants',
                  as: 'image',
                  cond: {
                    $or: [
                      { $eq: ['$$image.VariantSKU', '$$variant.VariantSKU'] },
                      { $eq: ['$$image.VariantSKU', ''] },
                    ],
                  },
                },
              },
            },
          },
        },
      },
    }
  }

  private getImageCleanupStage() {
    return {
      $project: {
        'Variants.Images.VariantSKU': 0,
        'Variants.Images.VariantGrams': 0,
        'Variants.Images.VariantInventoryTracker': 0,
        'Variants.Images.VariantInventoryQty': 0,
        'Variants.Images.VariantInventoryPolicy': 0,
        'Variants.Images.VariantFulfillmentService': 0,
        'Variants.Images.VariantPrice': 0,
        'Variants.Images.VariantCompareAtPrice': 0,
      },
    }
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel
      .aggregate([this.getCommonGroupStage(), this.getCommonProjectStage()])
      .exec()

    return products
  }

  async search(query: string): Promise<Product[]> {
    const products = await this.productModel
      .aggregate([
        {
          $match: {
            $or: [
              { Title: { $regex: query, $options: 'i' } },
              { VariantSKU: { $regex: query, $options: 'i' } },
              { Handle: { $regex: query, $options: 'i' } },
            ],
          },
        },
        this.getCommonGroupStage(),
        this.getCommonProjectStage(),
        this.getImageCleanupStage(),
      ])
      .exec()

    return products
  }
}
