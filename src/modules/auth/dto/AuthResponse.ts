import { UserResponse } from "../../user/api/dto/UserResponse";
import { AuthTokenResponse } from "./AuthTokenResponse";

/**
 * 인증 응답데이터
 */
export class AuthResponse {
    user: UserResponse;
    token: AuthTokenResponse;
    constructor(user: UserResponse, token: AuthTokenResponse) {
        this.user = user;
        this.token = token;
    }
}
