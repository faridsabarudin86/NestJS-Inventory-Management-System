import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  accountInfoResponse,
  addCorporateDto,
  editCorporateDto,
} from './corporate.interface';
import { v4 as Uuid } from 'uuid';
import { CorporateFunctions } from './corporate.functions';
import { UsersFunctions } from 'src/users/users.functions';

@Injectable()
export class CorporateService {
  constructor(
    private corporateFunctions: CorporateFunctions,
    private usersFunctions: UsersFunctions,
  ) {}

  async getAllCorporate(account: accountInfoResponse): Promise<any> {
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

        const result = await this.corporateFunctions.findManyCorporate();
        if (!result.output) {
          resolve({
            output: result,
            message: 'No corporates found !',
            HttpStatus: HttpStatus.OK,
          });
        }

        resolve(result);
      } catch (error) {
        reject(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR));
      }
    });
  }

  async getCorporate(
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

        const result = await this.corporateFunctions.findOneCorporate({
          uuid: corporateUuid,
        });
        if (!result.output) {
          reject(
            new HttpException('Corporate not found !', HttpStatus.BAD_REQUEST),
          );
        }

        resolve(result);
      } catch (error) {
        reject(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR));
      }
    });
  }

  async addCorporate(
    body: addCorporateDto,
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

        const uuid = Uuid();
        const bodyModified = {
          uuid: uuid,
          ...body,
        };

        const result =
          await this.corporateFunctions.createCorporate(bodyModified);

        resolve(result);
      } catch (error) {
        reject(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR));
      }
    });
  }

  async editCorporate(
    corporateUuid: string,
    body: editCorporateDto,
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

        const result = await this.corporateFunctions.editCorporate(
          { uuid: corporateUuid },
          body,
        );

        resolve(result);
      } catch (error) {
        reject(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR));
      }
    });
  }

  async deleteCorporate(
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

        const result = await this.corporateFunctions.deleteCorporate({
          uuid: corporateUuid,
        });

        resolve(result);
      } catch (error) {
        reject(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR));
      }
    });
  }
}
