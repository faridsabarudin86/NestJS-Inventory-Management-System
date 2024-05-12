import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InventoryModel } from './inventory.interface';

@Injectable()
export class InventoryFunctions {
  constructor(
    @InjectModel('Inventory') private InventoryModel: Model<InventoryModel>,
  ) {}

  async findManyInventory(query?: object): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.InventoryModel.find(query)
        .then((result) => {
          resolve({ output: result, HttpStatus: HttpStatus.OK });
        })
        .catch((error) => {
          reject(new HttpException(error, HttpStatus.BAD_REQUEST));
        });
    });
  }

  async findOneInventory(query?: object): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.InventoryModel.findOne(query)
        .then((result) => {
          resolve({ output: result, HttpStatus: HttpStatus.OK });
        })
        .catch((error) => {
          reject(new HttpException(error, HttpStatus.BAD_REQUEST));
        });
    });
  }

  async createInventory(query?: object): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.InventoryModel.create(query)
        .then((result) => {
          resolve({ output: result, HttpStatus: HttpStatus.OK });
        })
        .catch((error) => {
          reject(new HttpException(error, HttpStatus.BAD_REQUEST));
        });
    });
  }

  async editInventory(query?: object, data?: object): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.InventoryModel.updateOne(query, data)
        .then((result) => {
          resolve({ input: data, output: result, HttpStatus: HttpStatus.OK });
        })
        .catch((error) => {
          reject(new HttpException(error, HttpStatus.BAD_REQUEST));
        });
    });
  }

  async deleteInventory(query?: object): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.InventoryModel.deleteOne(query)
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
