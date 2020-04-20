import { EntityRepository, Repository } from "typeorm";
import { CdDtl } from "../entity/CdDtl";

/**
 * 코드 상세레파지토리
 */
@EntityRepository(CdDtl)
export class CdDtlRepository extends Repository<CdDtl> {

}