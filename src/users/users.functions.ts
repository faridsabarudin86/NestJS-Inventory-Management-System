import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersModel } from './users.interface';

@Injectable()
export class UsersFunctions {
  constructor(@InjectModel('Users') private UsersModel: Model<UsersModel>) {}

  async findManyUsers(query?: object): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.UsersModel.find(query)
        .then((result) => {
          resolve({ output: result, HttpStatus: HttpStatus.OK });
        })
        .catch((error) => {
          reject(new HttpException(error, HttpStatus.BAD_REQUEST));
        });
    });
  }

  async findOneUser(query?: object): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.UsersModel.findOne(query)
        .then((result) => {
          resolve({ output: result, HttpStatus: HttpStatus.OK });
        })
        .catch((error) => {
          reject(new HttpException(error, HttpStatus.BAD_REQUEST));
        });
    });
  }

  async createUser(query?: object): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.UsersModel.create(query)
        .then((result) => {
          resolve({ output: result, HttpStatus: HttpStatus.OK });
        })
        .catch((error) => {
          reject(new HttpException(error, HttpStatus.BAD_REQUEST));
        });
    });
  }

  async editUser(query?: object, data?: object): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.UsersModel.updateOne(query, data)
        .then((result) => {
          resolve({ input: data, output: result, HttpStatus: HttpStatus.OK });
        })
        .catch((error) => {
          reject(new HttpException(error, HttpStatus.BAD_REQUEST));
        });
    });
  }

  async deleteUser(query?: object): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.UsersModel.deleteOne(query)
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
