import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedProviders } from '@hades/shared/index';
import { EnvironmentModule } from './modules/environment.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [
        AuthModule,
        CqrsModule,
        EnvironmentModule,
    ],
    controllers: [],
    providers: [
        ...SharedProviders
    ],
    exports: [
        AuthModule,
        CqrsModule,
        EnvironmentModule,
        ...SharedProviders
    ]
})
export class SharedModule {}
