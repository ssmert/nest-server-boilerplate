import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { Equal, In, Like } from "typeorm";
import { UserResponse } from "../api/dto/UserResponse";
import { User } from "../entity/User";
import { UserService } from "./UserService";
import UserNotFoundException from "../infrastructure/exception/UserNotFoundException";
import { UserError } from "common/constants/UserErrorEnum";

/**
 * 사용자 조회 서비스
 */
@Injectable()
export default class UserRetireveService {
    constructor(private readonly userService: UserService) { }
    /**
     * 전체 사용자 목록을 조회한다.
     * 
     * @param userId 사용자식별자
     * @param userNm 사용자명
     */
    public async getList(userId?: string, userNm?: string): Promise<UserResponse[]> {
        const params: any = {};
        if (!_.isUndefined(userId)) {
            params.userId = Like(`%${userId}%`);
        }
        if (!_.isUndefined(userNm)) {
            params.userNm = Like(`%${userNm}%`);
        }

        return (await this.userService.getList(params)).toDtos();
    }

    /**
     * 특정 사용자를 조회한다.
     * 
     * @param userId 사용자식별자
     */
    public async get(userId: string): Promise<UserResponse> {
        const user: User = (await this.userService.get({ userId: Equal(userId) }));

        if (_.isUndefined(user)) {
            throw new UserNotFoundException(UserError.USER001, userId);
        }

        return user.toDto();
    }

    /**
     * 사용자 구분에 해당하는 사용자가 존재하는지 확인한다.
     * 
     * @param userDivs 사용자구분목록
     */
    public async checkExistByUserDiv(userDivs: string[]): Promise<number> {
        return this.userService.getCount({ userDiv: In(userDivs) });
    }

    /**
     * 사용자 분과에 해당하는 사용자가 존재하는지 확인한다.
     * 
     * @param userMajors 사용자분과목록
     */
    public async checkExistByUserMajor(userMajors: string[]): Promise<number> {
        return this.userService.getCount({ userMajor: In(userMajors) });
    }
}