import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { User } from 'modules/user/entity/User';
import { AuthService } from 'modules/auth/AuthService';

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        const user = request.user as User;
        AuthService.setAuthUser(user);

        return next.handle();
    }
}
