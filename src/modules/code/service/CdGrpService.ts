import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { Equal, FindConditions } from 'typeorm';
import { CdGrp } from '../entity/CdGrp';
import { CdGrpRepository } from '../repository/CdGrpRepository';

@Injectable()
export class CdGrpService {
    /**
     * 생성자이다.
     * 
     * @param cdGrpRepository 코드 레파지토리
     */
    constructor(
        private readonly cdGrpRepository: CdGrpRepository) { }

    /**
     * 전체 코드 목록을 조회한다.
     */
    async getList(conditions?: FindConditions<CdGrp>): Promise<CdGrp[]> {
        return await this.cdGrpRepository.find(conditions);
    }

    /**
     * 전체 코드 목록을 조회한다.
     * 
     * @param conditions 조건
     */
    async get(conditions: FindConditions<CdGrp>): Promise<CdGrp> {
        return await this.cdGrpRepository.findOne(conditions);
    }

    /**
     * 코드를 등록한다.
     * 
     * @param cdGrp 코드
     */
    async create(cdGrp: CdGrp): Promise<CdGrp> {
        return this.cdGrpRepository.save(this.cdGrpRepository.create(cdGrp));
    }

    /**
     * 코드를 삭제한다.
     * 
     * @param cdGrp 코드
     */
    async delete(conditions: FindConditions<CdGrp>): Promise<void> {
        this.cdGrpRepository.delete(conditions);
    }

    /**
     * 코드 건수를 조회한다.
     * 
     * @param conditions 조건
     */
    async getCount(findData: FindConditions<CdGrp>): Promise<number> {
        return await this.cdGrpRepository.count(findData);
    }

    /**
     * 코드가 존재하는지 확인한다.
     * 
     * @param cdGrpId 코드식별자
     */
    async isDup(cdGrpId: string): Promise<boolean> {
        const cdGrp: CdGrp = await this.cdGrpRepository.findOne({ cdGrpId: Equal(cdGrpId) });
        return !(_.isUndefined(cdGrp));
    }

    /**
     * 코드 엔티티 트렌젝션을 save한다.
     * 
     * @param cdGrp 코드
     */
    async save(cdGrp: CdGrp): Promise<void> {
        this.cdGrpRepository.save(cdGrp);
    }
}
