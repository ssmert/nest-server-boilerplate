import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { Equal, In } from "typeorm";
import CdDtlResponse from "../api/dto/CdDtlResponse";
import { CdDtl } from "../entity/CdDtl";
import CdDtlNotFoundException from "../infrastructure/exception/CdDtlNotFoundException";
import { CodeGroupError } from "common/constants/CodeGroupErrorEnum";
import { CdGrpService } from "./CdGrpService";
import { CdGrp } from "../entity/CdGrp";
import CdGrpNotFoundException from "../infrastructure/exception/CdGrpNotFoundException";

/**
 * 코드상세 조회 서비스
 */
@Injectable()
export default class CdDtlRetireveService {
    constructor(private readonly cdGrpService: CdGrpService) { }
    /**
     * 전체 코드상세 목록을 조회한다.
     * 
     * @param cdDtlId 코드상세식별자
     * @param cdDtlNm 코드상세명
     */
    public async getList(cdGrpId: string): Promise<CdDtlResponse[]> {
        const cdGrp: CdGrp = await this.cdGrpService.get({ cdGrpId: Equal(cdGrpId) });

        if (_.isUndefined(cdGrp)) {
            throw new CdGrpNotFoundException(CodeGroupError.CDGRP001, cdGrpId);
        }

        return cdGrp.cdDtls.toDtos();
    }

    /**
     * 특정 코드상세를 조회한다.
     * 
     * @param cdGrpId 코드그룹식별자
     * @param cdDtlId 코드상세식별자
     */
    public async get(cdGrpId: string, cdDtlId: string): Promise<CdDtlResponse> {
        const cdGrp: CdGrp = await this.cdGrpService.get({ cdGrpId: Equal(cdGrpId) });

        if (_.isUndefined(cdGrp)) {
            throw new CdDtlNotFoundException(CodeGroupError.CDGRP001, cdGrpId);
        }

        return cdGrp.getCdDtl(cdDtlId).toDto();
    }
}