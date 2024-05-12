import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CorporateFunctions } from 'src/corporate/corporate.functions';
import { UsersFunctions } from 'src/users/users.functions';
import { InventoryFunctions } from './inventory.functions';
import {
  accountInfoResponse,
  addInventoryDto,
  editInventoryDto,
  quantityTypeDto,
  quickEditInventoryQuantityDto,
} from './inventory.interface';
import { v4 as Uuid } from 'uuid';

@Injectable()
export class InventoryService {
  constructor(
    private inventoryFunctions: InventoryFunctions,
    private usersFunctions: UsersFunctions,
    private corporateFunctions: CorporateFunctions,
  ) {}

  async getAllInventoryInCorporate(
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

        const result = await this.inventoryFunctions.findManyInventory({
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

  async getAllInventory(account: accountInfoResponse): Promise<any> {
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

        const result = await this.inventoryFunctions.findManyInventory();
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

  async getInventory(
    corporateUuid: string,
    inventoryUuid: string,
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

        const result = await this.inventoryFunctions.findOneInventory({
          uuid: inventoryUuid,
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

  async addInventory(
    corporateUuid: string,
    body: addInventoryDto,
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

        const uuid = Uuid();
        const bodyModified = {
          ...body,
          uuid: uuid,
          corporateUuid: corporateUuid,
        };

        const result =
          await this.inventoryFunctions.createInventory(bodyModified);

        resolve(result);
      } catch (error) {
        reject(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR));
      }
    });
  }

  async editInventory(
    corporateUuid: string,
    inventoryUuid: string,
    body: editInventoryDto,
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

        const inventoryInfo = await this.inventoryFunctions.findOneInventory({
          uuid: inventoryUuid,
        });
        if (!inventoryInfo.output) {
          reject(
            new HttpException('Inventory not found !', HttpStatus.BAD_REQUEST),
          );
        }

        const bodyModified = {
          ...body,
        };

        const result = await this.inventoryFunctions.editInventory(
          { uuid: inventoryUuid },
          bodyModified,
        );

        resolve(result);
      } catch (error) {
        reject(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR));
      }
    });
  }

  async quickEditInventoryQuantity(
    corporateUuid: string,
    inventoryUuid: string,
    quantityType: quantityTypeDto,
    body: quickEditInventoryQuantityDto,
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

        const inventoryInfo = await this.inventoryFunctions.findOneInventory({
          uuid: inventoryUuid,
        });
        if (!inventoryInfo.output) {
          reject(
            new HttpException('Inventory not found !', HttpStatus.BAD_REQUEST),
          );
        }

        let currentQuantity;
        if (quantityType === quantityTypeDto.ADD) {
          currentQuantity = inventoryInfo.output.quantity + body.quantity;
        } else {
          currentQuantity = inventoryInfo.output.quantity - body.quantity;
        }

        const bodyModified = {
          uuid: inventoryInfo.output.uuid,
          corporateUuid: inventoryInfo.output.corporateUuid,
          name: inventoryInfo.output.name,
          manufacturer: inventoryInfo.output.manufacturer,
          price: inventoryInfo.output.price,
          quantity: currentQuantity,
        };

        const result = await this.inventoryFunctions.editInventory(
          { uuid: inventoryUuid },
          bodyModified,
        );

        resolve(result);
      } catch (error) {
        reject(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR));
      }
    });
  }

  async deleteInventory(
    corporateUuid: string,
    inventoryUuid: string,
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

        const result = await this.inventoryFunctions.deleteInventory({
          uuid: inventoryUuid,
        });

        resolve(result);
      } catch (error) {
        reject(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR));
      }
    });
  }
}
