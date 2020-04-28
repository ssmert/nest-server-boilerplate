import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/UserModule";
import { AuthController } from "./AuthController";
import { AuthService } from "./AuthService";
import { JwtStrategy } from "./JwtStrategy";
/**
 * 인증 모듈
 */
@Module({
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: "jwt" })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [PassportModule, AuthService],
})
export class AuthModule { }
