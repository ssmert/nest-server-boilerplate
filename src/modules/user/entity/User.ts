import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
// import { Role } from "../../role/entity/Role";
import { AbstractEntity } from "common/AbstractEntity";
import { UserResponse } from "../api/dto/UserResponse";
import { PasswordTransformer } from "modules/user/passwordTransformer";
import { Role } from "modules/role/entity/Role";

@Entity({ name: "tb_user" })
export class User extends AbstractEntity<UserResponse> {
    // 사용자 일련번호
    @PrimaryGeneratedColumn({ name: "user_seq", type: "bigint" })
    userSeq: number;

    // 사용자 아이디
    @Column({ name: "user_id", length: 100, unique: true })
    userId: string;

    // 사용자명
    @Column({ name: "user_nm", length: 50 })
    userNm: string;

    // 비밀번호
    @Column({ name: "user_pwd", length: 100, transformer: new PasswordTransformer() })
    userPwd: string;

    // 연락처
    @Column({ name: "user_phone", length: 20 })
    userPhone: string;

    // 사용자구분
    @Column({ name: "user_div", length: 36 })
    userDiv: string;

    // 사용자분과
    @Column({ name: "user_major", length: 36, nullable: true })
    userMajor: string;

    // 사용여부
    @Column("char", { name: "user_use_yn", length: 1 })
    userUseYn: string;

    // 역할목록
    @ManyToMany(() => Role, { cascade: true, eager: true })
    @JoinTable({ name: "tb_user_role", joinColumn: { name: "user_seq" }, inverseJoinColumn: { name: "role_seq" } })
    roles: Role[];

    ////////////////////////////////////////////////////////////////

    dtoClass = UserResponse;


    /**
     * 생성자
     * 
     * @param userId 사용자 아이디
     * @param userNm 사용자명 
     * @param userPwd 비밀번호 
     * @param userPhone 연락처 
     * @param userDiv 사용자구분 
     * @param userMajor 사용자분과 
     * @param userUseYn 사용여부 
     * @param roles 역할목록 
     */
    constructor(userId: string, userNm: string, userPwd: string, userPhone: string, userDiv: string, userMajor: string, userUseYn: string, roles: Role[]) {
        super()
        this.userId = userId;
        this.userNm = userNm;
        this.userPwd = userPwd;
        this.userPhone = userPhone;
        this.userDiv = userDiv;
        this.userMajor = userMajor;
        this.userUseYn = userUseYn;
        this.roles = roles;
    }



    /**
     * 사용자를 변경한다.
     * 
     * @param userId 사용자 아이디
     * @param userNm 사용자명 
     * @param userPwd 비밀번호 
     * @param userPhone 연락처 
     * @param userDiv 사용자구분 
     * @param userMajor 사용자분과 
     * @param userUseYn 사용여부 
     * @param roles 역할목록 
     */
    modifyUser = (userId: string, userNm: string, userPwd: string, userPhone: string, userDiv: string, userMajor: string, userUseYn: string, roles: Role[]): void => {
        this.userId = userId;
        this.userNm = userNm;
        this.userPwd = userPwd;
        this.userPhone = userPhone;
        this.userDiv = userDiv;
        this.userMajor = userMajor;
        this.userUseYn = userUseYn;
        this.roles = roles;
    }
}