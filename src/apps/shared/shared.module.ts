import { Module } from '@nestjs/common';
import { EnvironmentModule } from './modules/environment.module';
import { SharedProviders } from '@hades/shared/index';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [
        CqrsModule,
        EnvironmentModule
    ],
    controllers: [],
    providers: [
        ...SharedProviders
    ],
    exports: [
        CqrsModule,
        EnvironmentModule,
        ...SharedProviders
    ]
})
export class SharedModule {}
