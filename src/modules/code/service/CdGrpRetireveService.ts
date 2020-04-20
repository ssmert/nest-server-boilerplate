import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { Equal, In } from "typeorm";
import CdGrpResponse from "../api/dto/CdGrpResponse";
import { CdGrp } from "../entity/CdGrp";
import CdGrpNotFoundException from "../infrastructure/exception/CdGrpNotFoundException";
import { CdGrpService } from "./CdGrpService";
import { CodeGroupError } from "common/constants/CodeGroupErrorEnum";

/**
 * 코드 조회 서비스
 */
@Injectable()
export default class CdGrpRetireveService {
    constructor(private readonly cdGrpService: CdGrpService) { }
    /**
     * 전체 코드 목록을 조회한다.
     * 
     * @param cdGrpId 코드식별자
     * @param cdGrpNm 코드명
     */
    public async getList(cdGrpIds?: string[]): Promise<CdGrpResponse[]> {
        return (await this.cdGrpService.getList(_.isUndefined(cdGrpIds) || _.isEmpty(cdGrpIds) ? {} : { cdGrpId: In(cdGrpIds) })).toDtos()
    }

    /**
     * 특정 코드를 조회한다.
     * 
     * @param cdGrpId 코드식별자
     */
    public async get(cdGrpId: string): Promise<CdGrpResponse> {
        const cdGrp: CdGrp = await this.cdGrpService.get({ cdGrpId: Equal(cdGrpId) });

        if (_.isUndefined(cdGrp)) {
            throw new CdGrpNotFoundException(CodeGroupError.CDGRP001, cdGrpId);
        }

        return cdGrp.toDto();
    }
}