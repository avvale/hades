import { Module } from '@nestjs/common';
import { EnvironmentService } from '@hades/shared/domain/environment/environment.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true })
    ],
    providers: [
        {
            provide: EnvironmentService,
            useClass: ConfigService
        }
    ],
    exports: [
        EnvironmentService
    ]
})
export class EnvironmentModule {}
