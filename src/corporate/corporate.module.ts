import { Module, forwardRef } from '@nestjs/common';
import { CorporateController } from './corporate.controller';
import { CorporateService } from './corporate.service';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CorporateSchema } from './corporate.interface';
import { CorporateFunctions } from './corporate.functions';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Corporate', schema: CorporateSchema }]),
    forwardRef(() => UsersModule),
  ],
  controllers: [CorporateController],
  providers: [CorporateService, CorporateFunctions],
  exports: [CorporateFunctions],
})
export class CorporateModule {}
