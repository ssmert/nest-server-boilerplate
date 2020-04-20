import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { Equal, FindConditions } from 'typeorm';
import { CdDtl } from '../entity/CdDtl';
import { CdDtlRepository } from '../repository/CdDtlRepository';

@Injectable()
export class CdDtlService {
    /**
     * 생성자이다.
     * 
     * @param cdDtlRepository 코드상세 레파지토리
     */
    constructor(
        private readonly cdDtlRepository: CdDtlRepository) { }

    /**
     * 코드상세를 삭제한다.
     * 
     * @param cdDtl 코드상세
     */
    async delete(conditions: FindConditions<CdDtl>): Promise<void> {
        this.cdDtlRepository.delete(conditions);
    }

    /**
     * 코드상세 엔티티 트렌젝션을 save한다.
     * 
     * @param cdDtl 코드상세
     */
    async save(cdDtl: CdDtl): Promise<void> {
        this.cdDtlRepository.save(cdDtl);
    }
}
