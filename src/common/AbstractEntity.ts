import { Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { UtilsProvider } from '../providers/UtilsService';
import { AbstractDto } from './dto/AbstractDto';
import { ContextProvider } from 'providers/ContextProvider';
import { User } from 'modules/user/entity/User';

export abstract class AbstractEntity<T extends AbstractDto = AbstractDto> {
    // 등록자
    @Column({ name: 'reg_id', length: 100, nullable: true })
    regId: string;

    // 등록자명
    @Column({ name: 'reg_nm', length: 50, nullable: true })
    regNm: string;

    // 등록일시
    @CreateDateColumn({ name: 'reg_dt', type: 'datetime' })
    regDt: Date;

    // 변경자
    @Column({ name: 'chg_id', length: 100, nullable: true })
    chgId: string;

    // 변경자명
    @Column({ name: 'chg_nm', length: 50, nullable: true })
    chgNm: string;

    // 변경일시
    @UpdateDateColumn({ name: 'chg_dt', type: 'datetime' })
    chgDt: Date;

    abstract dtoClass: new (entity: AbstractEntity, options?: any) => T;

    toDto(options?: any) {
        return UtilsProvider.toDto(this.dtoClass, this, options);
    }

    @BeforeInsert()
    beforeInsert = () => {
        const user = ContextProvider.get('auth') as User;
        this.regId = user.userId;
        this.regNm = user.userNm;
        this.chgId = user.userId;
        this.chgNm = user.userNm;
    }

    @BeforeUpdate()
    beforeUpdate = () => {
        const user = ContextProvider.get('auth') as User;
        this.chgId = user.userId;
        this.chgNm = user.userNm;
    }
}
