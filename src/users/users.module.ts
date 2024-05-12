import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './users.interface';
import { CorporateModule } from 'src/corporate/corporate.module';
import { UsersFunctions } from './users.functions';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
    forwardRef(() => CorporateModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersFunctions],
  exports: [UsersFunctions],
})
export class UsersModule {}
