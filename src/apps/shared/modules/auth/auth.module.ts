import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SharedProviders } from '@hades/shared';
import { EnvironmentService } from '@hades/shared/domain/environment/environment.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EnvironmentModule } from './../environment.module';


@Module({
    imports: [
        CqrsModule,
        EnvironmentModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [EnvironmentModule],
            useFactory: async (environmentService: EnvironmentService) => ({
                secret: environmentService.get('OAUTH_JWT_PUBLIC_KEY'),
                // privateKey: environmentService.get('OAUTH_JWT_PRIVATE_KEY'),
                // publicKey: environmentService.get('OAUTH_JWT_PUBLIC_KEY')
            }),
            inject: [EnvironmentService]
        }),
    ],
    providers: [
        ...SharedProviders,
        JwtStrategy
    ],
    exports: [
        JwtModule,
    ]
})
export class AuthModule {}