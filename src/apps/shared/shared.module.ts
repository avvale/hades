import { Module } from '@nestjs/common';
import { SharedProviders } from '@hades/shared/index';
import { CqrsModule } from '@nestjs/cqrs';
import { EnvironmentModule } from './modules/environment.module';
import { JwtConfigModule } from './modules/jwt-config.module';

@Module({
    imports: [
        CqrsModule,
        EnvironmentModule,
        JwtConfigModule
    ],
    controllers: [],
    providers: [
        ...SharedProviders
    ],
    exports: [
        CqrsModule,
        EnvironmentModule,
        JwtConfigModule,
        ...SharedProviders
    ]
})
export class SharedModule {}
