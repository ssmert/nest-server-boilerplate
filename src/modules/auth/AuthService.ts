import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthError } from 'common/constants/AuthErrorEnum';
import * as _ from 'lodash';
import { User } from 'modules/user/entity/User';
import { ContextService } from '../../providers/contextService';
import { UtilsService } from '../../providers/utilsService';
import { ConfigService } from '../../shared/services/ConfigService';
import { UserService } from '../user/service/UserService';
import { AuthRequest } from './dto/AuthRequest';
import { AuthResponse } from './dto/AuthResponse';
import { AuthTokenResponse } from './dto/AuthTokenResponse';
import AuthException from './infrastructure/exception/AuthException';


@Injectable()
export class AuthService {
    private static authUserKey = process.env.JWT_SECRET_KEY;

    constructor(
        public readonly jwtService: JwtService,
        public readonly configService: ConfigService,
        public readonly userService: UserService,

    ) { }

    static setAuthUser(user: User) {
        ContextService.set(AuthService.authUserKey, user);
    }

    static getAuthUser(): User {
        return ContextService.get(AuthService.authUserKey);
    }

    //////////////////////////////////////////////////////////////////////

    /**
     * 
     * @param req 
     */
    async auth(req: AuthRequest): Promise<AuthResponse> {
        const authUser = await this.userService.get({ userId: req.userId });

        // 사용자가 존재하지 않으면..
        if (_.isUndefined(authUser)) {
            throw new AuthException(AuthError.AUTH001);
        }

        // 비밀번호가 일치하지 않으면..
        const isMatchPwd = await UtilsService.validateHash(req.userPwd, authUser && authUser.userPwd);
        if (!isMatchPwd) {
            throw new AuthException(AuthError.AUTH002);
        }

        const token: AuthTokenResponse = new AuthTokenResponse({
            expiresIn: this.configService.getNumber("JWT_EXPIRATION_TIME"),
            accessToken: await this.jwtService.signAsync({
                userId: authUser.userId,
                expiresIn: this.configService.getNumber("JWT_EXPIRATION_TIME")
            },
                { expiresIn: '1d' }),
        });

        return new AuthResponse(authUser.toDto(), token);
    }

}
