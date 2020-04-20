import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'modules/role/RoleModule';
import { AuthModule } from '../auth/AuthModule';
import UserController from './api/UserController';
import { UserRepository } from './repository/UserRepository';
import UserChangeService from './service/UserChangeService';
import UserRetireveService from './service/UserRetireveService';
import { UserService } from './service/UserService';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        forwardRef(() => RoleModule),
        TypeOrmModule.forFeature([UserRepository]),
    ],
    controllers: [UserController],
    exports: [UserService, UserRetireveService, UserChangeService],
    providers: [UserService, UserRetireveService, UserChangeService],
})
export class UserModule { }
