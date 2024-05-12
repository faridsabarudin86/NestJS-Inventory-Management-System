import { Module, forwardRef } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CorporateModule } from 'src/corporate/corporate.module';
import { UsersModule } from 'src/users/users.module';
import { InventorySchema } from './inventory.interface';
import { InventoryFunctions } from './inventory.functions';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Inventory', schema: InventorySchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => CorporateModule),
  ],
  controllers: [InventoryController],
  providers: [InventoryService, InventoryFunctions],
  exports: [InventoryFunctions],
})
export class InventoryModule {}
