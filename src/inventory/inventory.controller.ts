import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  UseGuards,
  Param,
  Body,
  Request,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryUrls } from './inventory.urls';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import {
  addInventoryDto,
  editInventoryDto,
  quantityTypeDto,
  quickEditInventoryQuantityDto,
} from './inventory.interface';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get(InventoryUrls.getAllInventoryInCorporate)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.CORPORATE_ADMIN, Role.ADMIN, Role.STAFF)
  getAllInventoryInCorporate(
    @Param('corporateUuid')
    corporateUuid: string,
    @Request()
    account: any,
  ) {
    return this.inventoryService.getAllInventoryInCorporate(
      corporateUuid,
      account.user,
    );
  }

  @Get(InventoryUrls.getAllInventory)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  getAllInventory(
    @Request()
    account: any,
  ) {
    return this.inventoryService.getAllInventory(account.user);
  }

  @Get(InventoryUrls.getInventory)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.CORPORATE_ADMIN, Role.ADMIN, Role.STAFF)
  getInventory(
    @Param('corporateUuid')
    corporateUuid: string,
    @Param('inventoryUuid')
    inventoryUuid: string,
    @Request()
    account: any,
  ) {
    return this.inventoryService.getInventory(
      corporateUuid,
      inventoryUuid,
      account.user,
    );
  }

  @Post(InventoryUrls.addInventory)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.CORPORATE_ADMIN, Role.ADMIN)
  addInventory(
    @Param('corporateUuid')
    corporateUuid: string,
    @Body()
    body: addInventoryDto,
    @Request()
    account: any,
  ) {
    return this.inventoryService.addInventory(
      corporateUuid,
      body,
      account.user,
    );
  }

  @Put(InventoryUrls.editInventory)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.CORPORATE_ADMIN, Role.ADMIN, Role.STAFF)
  editInventory(
    @Param('corporateUuid')
    corporateUuid: string,
    @Param('inventoryUuid')
    inventoryUuid: string,
    @Body()
    body: editInventoryDto,
    @Request()
    account: any,
  ) {
    return this.inventoryService.editInventory(
      corporateUuid,
      inventoryUuid,
      body,
      account.user,
    );
  }

  @Put(InventoryUrls.quickEditInventoryQuantity)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.CORPORATE_ADMIN, Role.ADMIN, Role.STAFF)
  quickEditInventoryQuantity(
    @Param('corporateUuid')
    corporateUuid: string,
    @Param('inventoryUuid')
    inventoryUuid: string,
    @Param('quantityType')
    quantityType: quantityTypeDto,
    @Body()
    body: quickEditInventoryQuantityDto,
    @Request()
    account: any,
  ) {
    return this.inventoryService.quickEditInventoryQuantity(
      corporateUuid,
      inventoryUuid,
      quantityType,
      body,
      account.user,
    );
  }

  @Delete(InventoryUrls.deleteInventory)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.CORPORATE_ADMIN, Role.ADMIN)
  deleteInventory(
    @Param('corporateUuid')
    corporateUuid: string,
    @Param('inventoryUuid')
    inventoryUuid: string,
    @Request()
    account: any,
  ) {
    return this.inventoryService.deleteInventory(
      corporateUuid,
      inventoryUuid,
      account.user,
    );
  }
}
