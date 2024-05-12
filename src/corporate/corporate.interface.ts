import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsDefined, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { Role } from 'src/roles/roles.enum';

export type CorporateDocument = HydratedDocument<CorporateModel>;

@Schema()
export class CorporateModel {
  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;
}

export const CorporateSchema = SchemaFactory.createForClass(CorporateModel);

export class accountInfoResponse {
  uuid: string;
  emailAddress: string;
  corporateUuid: string;
  roles: Role[];
}

export class addCorporateDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  location: string;
}

export class editCorporateDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  location: string;
}
