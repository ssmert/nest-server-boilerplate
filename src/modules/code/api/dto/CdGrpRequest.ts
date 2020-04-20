import { CdDtl } from "modules/code/entity/CdDtl";
import { ApiProperty } from "@nestjs/swagger";

export default class CdGrpRequest {
    // 코드 아이디
    @ApiProperty()
    cdGrpId: string;
    // 코드명
    @ApiProperty()
    cdGrpNm: string;

    /**
     * 생성자
     * 
     * @param cdGrpId 코드 아이디
     * @param cdGrpNm 코드명 
     */
    constructor(cdGrpId: string, cdGrpNm: string) {
        this.cdGrpId = cdGrpId;
        this.cdGrpNm = cdGrpNm;
    }
}