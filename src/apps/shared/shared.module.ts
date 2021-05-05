import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedProviders } from '@hades/shared/index';
import { EnvironmentModule } from './modules/environment.module';

@Module({
    imports: [
        CqrsModule,
        EnvironmentModule,
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
