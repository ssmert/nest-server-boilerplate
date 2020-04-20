import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CdGrpController from './api/CdGrpController';
import { CdGrpRepository } from './repository/CdGrpRepository';
import CdGrpChangeService from './service/CdGrpChangeService';
import CdGrpRetireveService from './service/CdGrpRetireveService';
import { CdGrpService } from './service/CdGrpService';
import { CdDtlRepository } from './repository/CdDtlRepository';
import CdDtlRetireveService from './service/CdDtlRetireveService';
import CdDtlChangeService from './service/CdDtlChangeService';
import CdDtlController from './api/CdDtlController';
import { CdDtlService } from './service/CdDtlService';


@Module({
    imports: [
        TypeOrmModule.forFeature([CdGrpRepository, CdDtlRepository]),
    ],
    controllers: [CdGrpController, CdDtlController],
    exports: [CdGrpService, CdGrpRetireveService, CdGrpChangeService, CdDtlService, CdDtlRetireveService, CdDtlChangeService],
    providers: [CdGrpService, CdGrpRetireveService, CdGrpChangeService, CdDtlService, CdDtlRetireveService, CdDtlChangeService],
})
export class CdGrpModule { }
