import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductModule } from './modules/product/product.module'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mongodb:edgestack1@karini-ai-assignment.if0ib.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=karini-ai-assignment',
    ),
    ProductModule,
  ],
})
export class AppModule {}
