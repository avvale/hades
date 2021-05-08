import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedProviders } from '@hades/shared/index';
import { EnvironmentModule } from './modules/environment.module';
import { AuthModule } from '@hades/iam/shared/domain/modules/auth/auth.module.ts';

@Module({
    imports: [
        CqrsModule,
        EnvironmentModule,
        AuthModule
    ],
    controllers: [],
    providers: [
        ...SharedProviders
    ],
    exports: [
        CqrsModule,
        EnvironmentModule,
        ...SharedProviders,
        AuthModule
    ]
})
export class SharedModule {}
