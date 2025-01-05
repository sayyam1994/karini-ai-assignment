export interface Product {
  _id: string
  Handle: string
  Title: string
  Body: string
  Vendor: string
  Type: string
  Tags: string
  Option1Name: string
  Option1Value: string
  Option2Name: string
  Option2Value: string
  Option3Name: string
  Option3Value: string
  Variants: Variant[]
}

export interface Variant {
  VariantSKU: string
  VariantGrams: number
  VariantInventoryTracker: string
  VariantInventoryQty: number
  VariantInventoryPolicy: string
  VariantFulfillmentService: string
  VariantPrice: number
  VariantCompareAtPrice: string
  Images: { ImageSrc: string }[]
}
