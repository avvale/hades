import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { urlencoded, json } from 'express';
import { EnvironmentService } from '@hades/shared/domain/environment/environment.service';
import { AppModule } from './app.module';
import { LoggerService } from './apps/core/modules/logger/logger.service';
import * as moment from 'moment-timezone';

async function bootstrap()
{
    const app                   = await NestFactory.create(AppModule, {logger: false});
    const environmentService    = app.get(EnvironmentService);
    const loggerService         = app.get(LoggerService);

    // set swagger config
    const options = new DocumentBuilder()
        .setTitle('Hades API')
        .setDescription('API to consume Hades services')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    app.use(json({ limit: environmentService.get<string>('APP_LIMIT_REQUEST_SIZE') }));
    app.use(urlencoded({ extended: true, limit: environmentService.get<string>('APP_LIMIT_REQUEST_SIZE') }));
    app.useLogger(loggerService);

    // set timezone
    if (environmentService.get<string>('APP_TIMEZONE')) process.env.TZ = environmentService.get<string>('APP_TIMEZONE');

    // set data source timezone
    moment.tz.setDefault(process.env.TZ);

    await app.listen(environmentService.get<number>('APP_PORT'));
}
bootstrap();
