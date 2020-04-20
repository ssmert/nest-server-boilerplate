import { AbstractEntity } from "common/AbstractEntity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { CdGrp } from "./CdGrp";
import CdDtlResponse from "../api/dto/CdDtlResponse";
import CdDtlRequest from "../api/dto/CdDtlRequest";

@Entity({ name: "tb_code_detail" })
export class CdDtl extends AbstractEntity<CdDtlResponse> {
    // 코드상세 일련번호
    @PrimaryGeneratedColumn({ name: "cd_dtl_seq", type: "bigint" })
    cdDtlSeq: number;

    // 코드상세 식별자
    @Column({ name: "cd_dtl_id", length: 100, unique: true })
    cdDtlId: string;

    // 코드상세명
    @Column({ name: "cd_dtl_nm", length: 50 })
    cdDtlNm: string;

    // 코드상세순서
    @Column({ name: "cd_dtl_ord", type: "int" })
    cdDtlOrd: number;

    // 코드그룹
    @ManyToOne(() => CdGrp, cdGrp => cdGrp.cdDtls, {
        onDelete: "RESTRICT"
    })
    @JoinColumn({ name: "cd_grp_seq" })
    cdGrp: CdGrp;

    ////////////////////////////////////////////////////////////////

    dtoClass = CdDtlResponse;

    /**
     * 생성자
     * 
     * @param cdDtlId 코드상세 식별자
     * @param cdDtlNm 코드상세명 
     * @param cdDtlOrd 코드상세순서 
     */
    constructor(cdDtlId: string, cdDtlNm: string, cdDtlOrd: number) {
        super();
        this.cdDtlId = cdDtlId;
        this.cdDtlNm = cdDtlNm;
        this.cdDtlOrd = cdDtlOrd;
    }

    /**
     * 코드를 변경한다.
     * 
     * @param cdDtlId 코드상세 식별자
     * @param cdDtlNm 코드상세명 
     * @param cdDtlOrd 코드상세순서 
     */
    modifyCdDtl = (req: CdDtlRequest): void => {
        this.cdDtlNm = req.cdDtlNm;
    }
}