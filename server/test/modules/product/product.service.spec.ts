import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ProductService } from '../../../src/modules/product/product.service'
import { Product } from '../../../src/schemas/product.schema'

describe('ProductService', () => {
  let service: ProductService
  let model: Model<Product>

  const mockGroupedProduct = {
    Handle: 'test-product',
    Title: 'Test Product',
    Body: 'Test Description',
    Vendor: 'Test Vendor',
    Type: 'Test Type',
    Tags: 'tag1, tag2',
    Option1Name: 'Size',
    Option1Value: 'Small',
    Option2Name: 'Color',
    Option2Value: 'Red',
    Option3Name: 'Material',
    Option3Value: 'Cotton',
    Variants: [
      {
        VariantSKU: 'TEST-SKU-1',
        VariantGrams: 500,
        VariantInventoryTracker: 'shopify',
        VariantInventoryQty: 10,
        VariantInventoryPolicy: 'deny',
        VariantFulfillmentService: 'manual',
        VariantPrice: 29.99,
        VariantCompareAtPrice: '39.99',
        Images: [
          {
            ImageSrc: 'test-image.jpg',
          },
        ],
      },
    ],
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken(Product.name),
          useValue: {
            aggregate: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<ProductService>(ProductService)
    model = module.get<Model<Product>>(getModelToken(Product.name))
  })

  describe('findAll', () => {
    it('should return all products with grouped variants', async () => {
      const aggregateMock = jest.fn().mockReturnThis()
      const execMock = jest.fn().mockResolvedValue([mockGroupedProduct])

      jest.spyOn(model, 'aggregate').mockImplementation(
        () =>
          ({
            exec: execMock,
            ...aggregateMock(),
          }) as any,
      )

      const result = await service.findAll()

      expect(result).toEqual([mockGroupedProduct])
      expect(model.aggregate).toHaveBeenCalled()
      expect(execMock).toHaveBeenCalled()
    })

    it('should handle empty results', async () => {
      const aggregateMock = jest.fn().mockReturnThis()
      const execMock = jest.fn().mockResolvedValue([])

      jest.spyOn(model, 'aggregate').mockImplementation(
        () =>
          ({
            exec: execMock,
            ...aggregateMock(),
          }) as any,
      )

      const result = await service.findAll()

      expect(result).toEqual([])
      expect(model.aggregate).toHaveBeenCalled()
      expect(execMock).toHaveBeenCalled()
    })

    it('should handle database errors', async () => {
      const aggregateMock = jest.fn().mockReturnThis()
      const execMock = jest.fn().mockRejectedValue(new Error('Database error'))

      jest.spyOn(model, 'aggregate').mockImplementation(
        () =>
          ({
            exec: execMock,
            ...aggregateMock(),
          }) as any,
      )

      await expect(service.findAll()).rejects.toThrow('Database error')
    })
  })

  describe('search', () => {
    it('should return products matching the search query', async () => {
      const searchQuery = 'test'
      const aggregateMock = jest.fn().mockReturnThis()
      const execMock = jest.fn().mockResolvedValue([mockGroupedProduct])

      jest.spyOn(model, 'aggregate').mockImplementation(
        () =>
          ({
            exec: execMock,
            ...aggregateMock(),
          }) as any,
      )

      const result = await service.search(searchQuery)

      expect(result).toEqual([mockGroupedProduct])
      expect(model.aggregate).toHaveBeenCalled()
      expect(execMock).toHaveBeenCalled()
    })

    it('should return empty array when no matches found', async () => {
      const searchQuery = 'nonexistent'
      const aggregateMock = jest.fn().mockReturnThis()
      const execMock = jest.fn().mockResolvedValue([])

      jest.spyOn(model, 'aggregate').mockImplementation(
        () =>
          ({
            exec: execMock,
            ...aggregateMock(),
          }) as any,
      )

      const result = await service.search(searchQuery)

      expect(result).toEqual([])
      expect(model.aggregate).toHaveBeenCalled()
      expect(execMock).toHaveBeenCalled()
    })

    it('should handle database errors during search', async () => {
      const searchQuery = 'test'
      const aggregateMock = jest.fn().mockReturnThis()
      const execMock = jest.fn().mockRejectedValue(new Error('Search error'))

      jest.spyOn(model, 'aggregate').mockImplementation(
        () =>
          ({
            exec: execMock,
            ...aggregateMock(),
          }) as any,
      )

      await expect(service.search(searchQuery)).rejects.toThrow('Search error')
    })
  })
})
