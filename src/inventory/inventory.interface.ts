import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from '@nestjs/class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/roles/roles.enum';

export type InventoryDocument = HydratedDocument<InventoryModel>;

@Schema()
export class InventoryModel {
  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop({ required: true })
  corporateUuid: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  manufacturer: string;

  @Prop()
  price: number;
}

export const InventorySchema = SchemaFactory.createForClass(InventoryModel);

export class accountInfoResponse {
  uuid: string;
  emailAddress: string;
  corporateUuid: string;
  roles: Role[];
}

export class addInventoryDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsString()
  manufacturer: string;

  @IsNumber()
  price: number;
}

export class editInventoryDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsString()
  manufacturer: string;

  @IsNumber()
  price: number;
}

export class quickEditInventoryQuantityDto {
  @IsNumber()
  quantity: number;
}

export enum quantityTypeDto {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
}
