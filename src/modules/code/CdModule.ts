import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CdDtlController } from "./api/CdDtlController";
import { CdGrpController } from "./api/CdGrpController";
import { CdDtlRepository } from "./repository/CdDtlRepository";
import { CdGrpRepository } from "./repository/CdGrpRepository";
import { CdDtlChangeService } from "./service/CdDtlChangeService";
import { CdDtlRetireveService } from "./service/CdDtlRetireveService";
import { CdDtlService } from "./service/CdDtlService";
import { CdGrpChangeService } from "./service/CdGrpChangeService";
import { CdGrpRetireveService } from "./service/CdGrpRetireveService";
import { CdGrpService } from "./service/CdGrpService";

@Module({
    imports: [
        TypeOrmModule.forFeature([CdGrpRepository, CdDtlRepository]),
    ],
    controllers: [CdGrpController, CdDtlController],
    exports: [CdGrpService, CdGrpRetireveService, CdGrpChangeService, CdDtlService, CdDtlRetireveService, CdDtlChangeService],
    providers: [CdGrpService, CdGrpRetireveService, CdGrpChangeService, CdDtlService, CdDtlRetireveService, CdDtlChangeService],
})
export class CdModule { }
