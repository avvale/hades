import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvironmentService } from '@hades/shared/domain/services/environment.service';
import { EnvironmentModule } from './environment.module';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [EnvironmentModule],
            useFactory: async (config: EnvironmentService) => ({
                privateKey: config.get('OAUTH_JWT_PRIVATE_KEY'),
                publicKey: config.get('OAUTH_JWT_PUBLIC_KEY')
            }),
            inject: [EnvironmentService]
        }),
    ],
    exports: [
        JwtModule
    ]
})
export class JwtConfigModule {}
