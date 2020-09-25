import { Module } from '@nestjs/common';
import { SharedProviders } from '@hades/shared/index';
import { CqrsModule } from '@nestjs/cqrs';
import { EnvironmentModule } from './modules/environment.module';

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
