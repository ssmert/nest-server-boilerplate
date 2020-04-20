import { EntityRepository, Repository } from "typeorm";
import { Role } from "../entity/Role";

/**
 * 역할 레파지토리
 */
@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {

}