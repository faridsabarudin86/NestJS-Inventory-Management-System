import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  accountInfoResponse,
  addUserDto,
  editUserDto,
} from './users.interface';
import { v4 as Uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { CorporateFunctions } from 'src/corporate/corporate.functions';
import { UsersFunctions } from './users.functions';

@Injectable()
export class UsersService {
  constructor(
    private usersFunctions: UsersFunctions,
    private corporateFunctions: CorporateFunctions,
  ) {}

  async getAllUsersInCorporate(
    corporateUuid: string,
    account: accountInfoResponse,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const accountInfo = await this.usersFunctions.findOneUser({
          uuid: account.uuid,
        });
        if (!accountInfo) {
          reject(
            new HttpException('Account not found !', HttpStatus.BAD_REQUEST),
          );
        }

        const corporateInfo = await this.corporateFunctions.findOneCorporate({
          uuid: corporateUuid,
        });
        if (!corporateInfo.output) {
          reject(
            new HttpException('Corporate not found !', HttpStatus.BAD_REQUEST),
          );
        }

        const result = await this.usersFunctions.findManyUsers({
          corporateUuid: corporateUuid,
        });
        if (!result.output) {
          resolve({
            output: result,
            message: 'No users found !',
            HttpStatus: HttpStatus.OK,
          });
        }

        resolve(result);
      } catch (error) {
        reject(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR));
      }
    });
  }

  async getAllUsers(account: accountInfoResponse): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const accountInfo = await this.usersFunctions.findOneUser({
          uuid: account.uuid,
        });
        if (!accountInfo) {
          reject(
            new HttpException('Account not found !', HttpStatus.BAD_REQUEST),
          );
        }

        const result = await this.usersFunctions.findManyUsers();
        if (!result.output) {
          resolve({
            output: result,
            message: 'No users found !',
            HttpStatus: HttpStatus.OK,
          });
        }

        resolve(result);
      } catch (error) {
        reject(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR));
      }
    });
  }

  async getUser(
    corporateUuid: string,
    userUuid: string,
    account: accountInfoResponse,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const accountInfo = await this.usersFunctions.findOneUser({
          uuid: account.uuid,
        });
        if (!accountInfo) {
          reject(
            new HttpException('Account not found !', HttpStatus.BAD_REQUEST),
          );
        }

        const corporateInfo = await this.corporateFunctions.findOneCorporate({
          uuid: corporateUuid,
        });
        if (!corporateInfo.output) {
          reject(
            new HttpException('Corporate not found !', HttpStatus.BAD_REQUEST),
          );
        }

        const result = await this.usersFunctions.findOneUser({
          uuid: userUuid,
        });
        if (!result.output) {
          resolve({
            output: result,
            message: 'User not found !',
            HttpStatus: HttpStatus.OK,
          });
        }

        resolve(result);
      } catch (error) {
        reject(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR));
      }
    });
  }

  async addUser(
    corporateUuid: string,
    body: addUserDto,
    account: accountInfoResponse,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const accountInfo = await this.usersFunctions.findOneUser({
          uuid: account.uuid,
        });
        if (!accountInfo) {
          reject(
            new HttpException('Account not found !', HttpStatus.BAD_REQUEST),
          );
        }

        const corporateInfo = await this.corporateFunctions.findOneCorporate({
          uuid: corporateUuid,
        });
        if (!corporateInfo.output) {
          reject(
            new HttpException('Corporate not found !', HttpStatus.BAD_REQUEST),
          );
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);
        const uuid = Uuid();
        const bodyModified = {
          ...body,
          uuid: uuid,
          password: hashedPassword,
        };

        const result = await this.usersFunctions.createUser(bodyModified);

        resolve(result);
      } catch (error) {
        reject(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR));
      }
    });
  }

  async editUser(
    corporateUuid: string,
    userUuid: string,
    body: editUserDto,
    account: accountInfoResponse,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const accountInfo = await this.usersFunctions.findOneUser({
          uuid: account.uuid,
        });
        if (!accountInfo) {
          reject(
            new HttpException('Account not found !', HttpStatus.BAD_REQUEST),
          );
        }

        const userInfo = await this.usersFunctions.findOneUser({
          uuid: userUuid,
          corporateUuid: corporateUuid,
        });
        if (!userInfo.output) {
          reject(new HttpException('User not found !', HttpStatus.BAD_REQUEST));
        }

        const corporateInfo = await this.corporateFunctions.findOneCorporate({
          uuid: corporateUuid,
        });
        if (!corporateInfo.output) {
          reject(
            new HttpException('Corporate not found !', HttpStatus.BAD_REQUEST),
          );
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);
        const bodyModified = {
          ...body,
          password: hashedPassword,
        };

        const result = await this.usersFunctions.editUser(
          { uuid: userUuid },
          bodyModified,
        );

        resolve(result);
      } catch (error) {
        reject(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR));
      }
    });
  }

  async deleteUser(
    corporateUuid: string,
    userUuid: string,
    account: accountInfoResponse,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const accountInfo = await this.usersFunctions.findOneUser({
          uuid: account.uuid,
        });
        if (!accountInfo) {
          reject(
            new HttpException('Account not found !', HttpStatus.BAD_REQUEST),
          );
        }

        const userInfo = await this.usersFunctions.findOneUser({
          uuid: userUuid,
          corporateUuid: corporateUuid,
        });
        if (!userInfo.output) {
          reject(new HttpException('User not found !', HttpStatus.BAD_REQUEST));
        }

        const corporateInfo = await this.corporateFunctions.findOneCorporate({
          uuid: corporateUuid,
        });
        if (!corporateInfo.output) {
          reject(
            new HttpException('Corporate not found !', HttpStatus.BAD_REQUEST),
          );
        }

        const result = await this.usersFunctions.deleteUser({ uuid: userUuid });

        resolve(result);
      } catch (error) {
        reject(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR));
      }
    });
  }
}
