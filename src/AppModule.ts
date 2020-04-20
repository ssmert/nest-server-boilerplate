import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import './appPolyfill';
// 미들웨어
import { contextMiddleware } from './middlewares';

// 모듈
import { SharedModule } from './shared/SharedModule';
import { CdGrpModule } from 'modules/code/CdGrpModule';
import { RoleModule } from 'modules/role/RoleModule';
import { AuthModule } from './modules/auth/AuthModule';
import { UserModule } from './modules/user/UserModule';

// 설정
import { ConfigService } from './shared/services/ConfigService';

@Module({
    imports: [
        AuthModule,
        UserModule,
        RoleModule,
        CdGrpModule,
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
        consumer.apply(contextMiddleware).forRoutes('*');
    }
}
