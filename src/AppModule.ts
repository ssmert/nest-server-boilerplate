import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CdModule } from "modules/code/CdModule";
import { RoleModule } from "modules/role/RoleModule";
import { ConfigService } from "shared/services/ConfigService";
import { SharedModule } from "shared/SharedModule";
import "./appPolyfill";
import { contextMiddleware } from "./middlewares";
import { AuthModule } from "./modules/auth/AuthModule";
import { UserModule } from "./modules/user/UserModule";

@Module({
    imports: [
        AuthModule,
        UserModule,
        RoleModule,
        CdModule,
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ConfigService) =>
                configService.typeOrmConfig,
            inject: [ConfigService],
        }),
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(contextMiddleware).forRoutes("*");
    }
}
