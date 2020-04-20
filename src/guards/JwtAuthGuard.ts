import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import AuthException from 'modules/auth/infrastructure/exception/AuthException';
import { AuthError } from 'common/constants/AuthErrorEnum';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        // 토큰 만료시...
        if (info && info instanceof TokenExpiredError) {
            throw new AuthException(AuthError.AUTH005);
        }
        if (err || !user) {
            throw err || new AuthException(AuthError.AUTH003);
        }

        return user;
    }
}