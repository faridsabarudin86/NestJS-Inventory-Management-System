import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CorporateModel } from './corporate.interface';

@Injectable()
export class CorporateFunctions {
  constructor(
    @InjectModel('Corporate') private CorporateModel: Model<CorporateModel>,
  ) {}

  async findManyCorporate(query?: object): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.CorporateModel.find(query)
        .then((result) => {
          resolve({ output: result, HttpStatus: HttpStatus.OK });
        })
        .catch((error) => {
          reject(new HttpException(error, HttpStatus.BAD_REQUEST));
        });
    });
  }

  async findOneCorporate(query?: object): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.CorporateModel.findOne(query)
        .then((result) => {
          resolve({ output: result, HttpStatus: HttpStatus.OK });
        })
        .catch((error) => {
          reject(new HttpException(error, HttpStatus.BAD_REQUEST));
        });
    });
  }

  async createCorporate(query?: object): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.CorporateModel.create(query)
        .then((result) => {
          resolve({ output: result, HttpStatus: HttpStatus.OK });
        })
        .catch((error) => {
          reject(new HttpException(error, HttpStatus.BAD_REQUEST));
        });
    });
  }

  async editCorporate(query?: object, data?: object): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.CorporateModel.updateOne(query, data)
        .then((result) => {
          resolve({ input: data, output: result, HttpStatus: HttpStatus.OK });
        })
        .catch((error) => {
          reject(new HttpException(error, HttpStatus.BAD_REQUEST));
        });
    });
  }

  async deleteCorporate(query?: object): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.CorporateModel.deleteOne(query)
        .then((result) => {
          resolve({
            input: query,
            output: result,
            HttpStatus: HttpStatus.OK,
          });
        })
        .catch((error) => {
          reject(new HttpException(error, HttpStatus.BAD_REQUEST));
        });
    });
  }
}
