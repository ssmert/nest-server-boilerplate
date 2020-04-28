import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleController } from "./api/RoleController";
import { RoleRepository } from "./repository/RoleRepository";
import { RoleChangeService } from "./service/RoleChangeService";
import { RoleRetireveService } from "./service/RoleRetireveService";
import { RoleService } from "./service/RoleService";


@Module({
    imports: [
        TypeOrmModule.forFeature([RoleRepository]),
    ],
    controllers: [RoleController],
    exports: [RoleService, RoleRetireveService, RoleChangeService],
    providers: [RoleService, RoleRetireveService, RoleChangeService],
})
export class RoleModule { }
