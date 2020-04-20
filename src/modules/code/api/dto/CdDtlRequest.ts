import { ApiProperty } from "@nestjs/swagger";

export default class CdDtlRequest {
    // 코드상세명
    @ApiProperty()
    cdDtlNm: string;

    /**
     * 생성자
     * 
     * @param cdDtlNm 코드상세명 
     */
    constructor(cdDtlNm: string) {
        this.cdDtlNm = cdDtlNm;
    }
}