import { AbstractEntity } from "common/AbstractEntity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import RoleResponse from "../api/dto/RoleResponse";

@Entity({ name: "tb_role" })
export class Role extends AbstractEntity<RoleResponse> {
    // 역할 일련번호
    @PrimaryGeneratedColumn({ name: "role_seq", type: "bigint" })
    roleSeq: number;

    // 역할 아이디
    @Column({ name: "role_id", length: 100, unique: true })
    roleId: string;

    // 역할명
    @Column({ name: "role_nm", length: 50 })
    roleNm: string;

    // 사용여부
    @Column("char", { name: "role_use_yn", length: 1 })
    roleUseYn: string;

    ////////////////////////////////////////////////////////////////

    dtoClass = RoleResponse;


    /**
     * 생성자
     * 
     * @param roleId 역할 아이디
     * @param roleNm 역할명 
     * @param roleUseYn 사용여부 
     */
    constructor(roleId: string, roleNm: string, roleUseYn: string) {
        super();
        this.roleId = roleId;
        this.roleNm = roleNm;
        this.roleUseYn = roleUseYn;
    }

    /**
     * 역할을 변경한다.
     * 
     * @param roleId 역할 아이디
     * @param roleNm 역할명 
     * @param roleUseYn 사용여부 
     */
    modifyRole = (roleId: string, roleNm: string, roleUseYn: string): void => {
        this.roleId = roleId;
        this.roleNm = roleNm;
        this.roleUseYn = roleUseYn;
    }
}