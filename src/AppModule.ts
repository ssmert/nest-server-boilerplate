import './appPolyfill';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { contextMiddleware } from './middlewares';
import { AuthModule } from './modules/auth/AuthModule';
import { UserModule } from './modules/user/UserModule';
import { ConfigService } from './shared/services/ConfigService';
import { SharedModule } from './shared/SharedModule';
import { RoleModule } from 'modules/role/RoleModule';
import { CdGrpModule } from 'modules/code/CdGrpModule';

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
