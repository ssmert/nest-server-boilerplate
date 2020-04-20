import { Injectable } from "@nestjs/common";
import { Equal, In } from "typeorm";
import CdGrpRequest from "../api/dto/CdGrpRequest";
import { CdGrp } from "../entity/CdGrp";
import CdGrpDuplicateException from "../infrastructure/exception/CdGrpDuplicateException";
import { CdGrpService } from "./CdGrpService";
import { CodeGroupError } from "common/constants/CodeGroupErrorEnum";
import { CdDtl } from "../entity/CdDtl";
import _ from "lodash";
import { CdDtlService } from "./CdDtlService";

/**
 * 코드 변경 서비스
 */
@Injectable()
export default class CdGrpChangeService {
    constructor(
        public cdGrpService: CdGrpService,
        public cdDtlService: CdDtlService,
    ) { }

    /**
     * 신규 코드를 등록한다.
     * 
     * @param req 요청객체
     */
    async createCdGrp(req: CdGrpRequest): Promise<void> {
        // 동일한 코드가 존재한다면...
        if ((await this.cdGrpService.isDup(req.cdGrpId))) {
            throw new CdGrpDuplicateException(CodeGroupError.CDGRP002, req.cdGrpId);
        }

        const cdGrp: CdGrp = new CdGrp(req.cdGrpId, req.cdGrpNm, null);

        await this.cdGrpService.create(cdGrp);
    }

    /**
     * 특정 코드를 수정한다.
     * 
     * @param cdGrpId 코드식별자
     * @param req 요청객체
     */
    async updateCdGrp(cdGrpId: string, req: CdGrpRequest): Promise<void> {
        // 동일한 코드가 존재한다면...
        if (cdGrpId !== req.cdGrpId && (await this.cdGrpService.isDup(req.cdGrpId))) {
            throw new CdGrpDuplicateException(CodeGroupError.CDGRP002, req.cdGrpId);
        }

        const cdGrp = await this.cdGrpService.get({ cdGrpId: Equal(cdGrpId) });


        cdGrp.modifyCdGrp(req.cdGrpId, req.cdGrpNm, cdGrp.cdDtls);

        await this.cdGrpService.save(cdGrp);
    }

    /**
     * 특정 코드를 삭제한다.
     * 
     * @param cdGrp 코드
     */
    async deleteCdGrp(cdGrpId: string): Promise<void> {
        await this.cdGrpService.delete({ cdGrpId: Equal(cdGrpId) });
    }
}