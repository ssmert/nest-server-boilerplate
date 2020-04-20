import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import express, { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import * as RateLimit from 'express-rate-limit';
import { GlobalExceptionFilter } from 'filters/GlobalExceptionFilter';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { initializeTransactionalContext, patchTypeORMRepositoryWithBaseRepository } from 'typeorm-transactional-cls-hooked';
import { AppModule } from './AppModule';
import { ConfigService } from './shared/services/ConfigService';
import { SharedModule } from './shared/SharedModule';
import { setupSwagger } from './Swagger';
import { GlobalValidationPipe } from 'decorators/GlobalValidationPipe';

async function bootstrap() {
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        new ExpressAdapter(),
        { cors: true },
    );
    app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    app.use(helmet());
    app.use(
        new RateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
        }),
    );
    app.use(compression());

    // 로그 설정
    app.use(morgan('combined'));
    app.useGlobalPipes(new GlobalValidationPipe());

    // 리플렉터
    const reflector = app.get(Reflector);

    // 글로벌 필터 설정
    app.useGlobalFilters(new GlobalExceptionFilter(reflector));
    // 인터셉터 설정
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

    // TODO 추후 제거!!!
    // app.useGlobalPipes(
    //     new ValidationPipe({
    //         whitelist: true,
    //         transform: true,
    //         dismissDefaultMessages: true,
    //         validationError: {
    //             target: false,
    //         },
    //     }),
    // );

    const configService = app.select(SharedModule).get(ConfigService);

    app.connectMicroservice({
        transport: Transport.TCP,
        options: {
            port: configService.getNumber('TRANSPORT_PORT'),
            retryAttempts: 5,
            retryDelay: 3000,
        },
    });

    await app.startAllMicroservicesAsync();

    if (['development', 'staging'].includes(configService.nodeEnv)) {
        setupSwagger(app);
    }

    const port = configService.getNumber('PORT');
    await app.listen(port);

    console.info(`server running on port ${port}`);
}

bootstrap();
