import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthError } from 'common/constants/AuthErrorEnum';
import * as _ from 'lodash';
import { User } from 'modules/user/entity/User';
import { ContextProvider } from '../../providers/ContextProvider';
import { UtilsService } from '../../providers/UtilsService';
import { ConfigService } from '../../shared/services/ConfigService';
import { UserService } from '../user/service/UserService';
import { AuthRequest } from './dto/AuthRequest';
import { AuthResponse } from './dto/AuthResponse';
import { AuthTokenResponse } from './dto/AuthTokenResponse';
import AuthException from './infrastructure/exception/AuthException';


@Injectable()
export class AuthService {
    constructor(
        public readonly jwtService: JwtService,
        public readonly configService: ConfigService,
        public readonly userService: UserService,
    ) { }

    static setAuthUser(user: User) {
        ContextProvider.set('auth', user);
    }

    //////////////////////////////////////////////////////////////////////

    /**
     * 인증을 처리한다.
     * 
     * @param req 요청
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
                userNm: authUser.userNm,
                expiresIn: this.configService.getNumber("JWT_EXPIRATION_TIME")
            },
                { expiresIn: '1d' }),
        });

        return new AuthResponse(authUser.toDto(), token);
    }

}
