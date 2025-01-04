import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Product extends Document {
  @Prop()
  Handle: string

  @Prop()
  Title: string

  @Prop()
  Body: string

  @Prop()
  Vendor: string

  @Prop()
  Type: string

  @Prop()
  Tags: string

  @Prop()
  Option1Name: string

  @Prop()
  Option1Value: string

  @Prop()
  Option2Name: string

  @Prop()
  Option2Value: string

  @Prop()
  Option3Name: string

  @Prop()
  Option3Value: string

  @Prop()
  VariantSKU: string

  @Prop()
  VariantGrams: number

  @Prop()
  VariantInventoryTracker: string

  @Prop()
  VariantInventoryQty: number

  @Prop()
  VariantInventoryPolicy: string

  @Prop()
  VariantFulfillmentService: string

  @Prop()
  VariantPrice: number

  @Prop()
  VariantCompareAtPrice: string

  @Prop()
  ImageSrc: string
}

export const ProductSchema = SchemaFactory.createForClass(Product)
