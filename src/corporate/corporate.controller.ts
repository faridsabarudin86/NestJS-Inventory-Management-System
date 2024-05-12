import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  UseGuards,
  Body,
  Param,
  Request,
} from '@nestjs/common';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { CorporateService } from './corporate.service';
import { CorporateUrls } from './corporate.urls';
import { addCorporateDto, editCorporateDto } from './corporate.interface';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('corporate')
export class CorporateController {
  constructor(private corporateService: CorporateService) {}

  @Get(CorporateUrls.getAllCorporate)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  getAllCorporate(
    @Request()
    account: any,
  ) {
    return this.corporateService.getAllCorporate(account.user);
  }

  @Get(CorporateUrls.getCorporate)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.CORPORATE_ADMIN)
  getCorporate(
    @Param('corporateUuid')
    corporateUuid: string,
    @Request()
    account: any,
  ) {
    return this.corporateService.getCorporate(corporateUuid, account.user);
  }

  @Post(CorporateUrls.addCorporate)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  addCorporate(
    @Body()
    body: addCorporateDto,
    @Request()
    account: any,
  ) {
    return this.corporateService.addCorporate(body, account.user);
  }

  @Put(CorporateUrls.editCorporate)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.CORPORATE_ADMIN)
  editCorporate(
    @Param('corporateUuid')
    corporateUuid: string,
    @Body()
    body: editCorporateDto,
    @Request()
    account: any,
  ) {
    return this.corporateService.editCorporate(
      corporateUuid,
      body,
      account.user,
    );
  }

  @Delete(CorporateUrls.deleteCorporate)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  deleteCorporate(
    @Param('corporateUuid')
    corporateUuid: string,
    @Request()
    account: any,
  ) {
    return this.corporateService.deleteCorporate(corporateUuid, account.user);
  }
}
