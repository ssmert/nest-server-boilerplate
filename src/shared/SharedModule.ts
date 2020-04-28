import { Global, HttpModule, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "./services/ConfigService";
import { ValidatorService } from "./services/ValidatorService";

const providers = [ConfigService, ValidatorService];

@Global()
@Module({
    providers,
    imports: [
        HttpModule,
        JwtModule.registerAsync({
            imports: [SharedModule],
            useFactory: (configService: ConfigService) => ({
                secretOrPrivateKey: configService.get("JWT_SECRET_KEY")
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [...providers, HttpModule, JwtModule],
})
export class SharedModule { }
