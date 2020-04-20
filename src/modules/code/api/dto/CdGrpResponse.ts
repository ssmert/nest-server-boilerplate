import { AbstractDto } from "common/dto/AbstractDto";
import { CdGrp } from "modules/code/entity/CdGrp";
import { CdDtl } from "modules/code/entity/CdDtl";
import CdDtlResponse from "./CdDtlResponse";

export default class CdGrpResponse extends AbstractDto {
    // 코드 아이디
    cdGrpId: string;
    // 코드명
    cdGrpNm: string;
    // 사용여부
    cdDtls: CdDtlResponse[];

    /**
     * 생성자
     * 
     * @param cdGrp 코드그룹
     */
    constructor(cdGrp: CdGrp) {
        super(cdGrp)
        this.cdGrpId = cdGrp.cdGrpId;
        this.cdGrpNm = cdGrp.cdGrpNm;
        this.cdDtls = cdGrp.cdDtls.toDtos();
    }
}