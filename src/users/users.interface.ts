import {
  IsArray,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
} from '@nestjs/class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/roles/roles.enum';

export type UsersDocument = HydratedDocument<UsersModel>;

@Schema()
export class UsersModel {
  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop({ required: true, unique: true })
  emailAddress: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  corporateUuid: string;

  @Prop({ required: true })
  roles: Role[];

  @Prop({ required: true })
  fullName: string;
}

export const UsersSchema = SchemaFactory.createForClass(UsersModel);

export class accountInfoResponse {
  uuid: string;
  emailAddress: string;
  corporateUuid: string;
  roles: Role[];
}

export class addUserDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsDefined()
  @IsNotEmpty()
  @IsUUID()
  corporateUuid: string;

  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  roles: Role[];

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  fullName: string;
}

export class editUserDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsDefined()
  @IsNotEmpty()
  @IsUUID()
  corporateUuid: string;

  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  roles: Role[];

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  fullName: string;
}
