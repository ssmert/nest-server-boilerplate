import { ApiProperty } from '@nestjs/swagger';

import { UserResponse } from '../../user/api/dto/UserResponse';
import { AuthTokenResponse } from './AuthTokenResponse';

export class AuthResponse {
    user: UserResponse;
    token: AuthTokenResponse;
    constructor(user: UserResponse, token: AuthTokenResponse) {
        this.user = user;
        this.token = token;
    }
}
