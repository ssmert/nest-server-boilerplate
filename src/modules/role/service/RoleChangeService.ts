import { Injectable } from "@nestjs/common";
import { RoleError } from "modules/role/infrastructure/constants/RoleErrorEnum";
import { Equal } from "typeorm";
import { RoleRequest } from "../api/dto/RoleRequest";
import { Role } from "../entity/Role";
import { RoleDuplicateException } from "../infrastructure/exception/RoleDuplicateException";
import { RoleService } from "./RoleService";

/**
 * 역할 변경 서비스
 */
@Injectable()
export class RoleChangeService {
    constructor(
        public roleService: RoleService,
    ) { }

    /**
     * 신규 역할을 등록한다.
     * 
     * @param req 요청객체
     */
    async createRole(req: RoleRequest): Promise<void> {
        // 동일한 역할이 존재한다면...
        if ((await this.roleService.isDup(req.roleId))) {
            throw new RoleDuplicateException(RoleError.ROLE002, req.roleId);
        }

        const role: Role = new Role(req.roleId, req.roleNm, req.roleUseYn);

        await this.roleService.create(role);
    }

    /**
     * 특정 역할을 수정한다.
     * 
     * @param roleId 역할식별자
     * @param req 요청객체
     */
    async updateRole(roleId: string, req: RoleRequest): Promise<void> {
        // 동일한 역할이 존재한다면...
        if (roleId !== req.roleId && (await this.roleService.isDup(req.roleId))) {
            throw new RoleDuplicateException(RoleError.ROLE002, req.roleId);
        }

        const role = await this.roleService.get({ roleId: Equal(roleId) });

        role.modifyRole(req.roleId, req.roleNm, req.roleUseYn);

        await this.roleService.save(role);
    }

    /**
     * 특정 역할을 삭제한다.
     * 
     * @param role 역할
     */
    async deleteRole(roleId: string): Promise<void> {
        await this.roleService.delete({ roleId: Equal(roleId) });
    }
}