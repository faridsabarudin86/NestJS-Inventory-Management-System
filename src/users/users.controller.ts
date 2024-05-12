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
import { UsersService } from './users.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { UsersUrls } from './users.urls';
import { addUserDto, editUserDto } from './users.interface';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(UsersUrls.getAllUsersInCorporate)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.CORPORATE_ADMIN, Role.ADMIN)
  getAllUsersInCorporate(
    @Param('corporateUuid')
    corporateUuid: string,
    @Request()
    account: any,
  ) {
    return this.usersService.getAllUsersInCorporate(
      corporateUuid,
      account.user,
    );
  }

  @Get(UsersUrls.getAllUsers)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  getAllUsers(
    @Request()
    account: any,
  ) {
    return this.usersService.getAllUsers(account.user);
  }

  @Get(UsersUrls.getUser)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.CORPORATE_ADMIN, Role.ADMIN)
  getUser(
    @Param('corporateUuid')
    corporateUuid: string,
    @Param('userUuid')
    userUuid: string,
    @Request()
    account: any,
  ) {
    return this.usersService.getUser(corporateUuid, userUuid, account.user);
  }

  @Post(UsersUrls.addUser)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.CORPORATE_ADMIN, Role.ADMIN)
  addUser(
    @Param('corporateUuid')
    corporateUuid: string,
    @Body()
    body: addUserDto,
    @Request()
    account: any,
  ) {
    return this.usersService.addUser(corporateUuid, body, account.user);
  }

  @Put(UsersUrls.editUser)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.CORPORATE_ADMIN, Role.ADMIN)
  editUser(
    @Param('corporateUuid')
    corporateUuid: string,
    @Param('userUuid')
    userUuid: string,
    @Body()
    body: editUserDto,
    @Request()
    account: any,
  ) {
    return this.usersService.editUser(
      corporateUuid,
      userUuid,
      body,
      account.user,
    );
  }

  @Delete(UsersUrls.deleteUser)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.CORPORATE_ADMIN)
  deleteUser(
    @Param('corporateUuid')
    corporateUuid: string,
    @Param('userUuid')
    userUuid: string,
    @Request()
    account: any,
  ) {
    return this.usersService.deleteUser(corporateUuid, userUuid, account.user);
  }
}
