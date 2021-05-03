import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SharedProviders } from '@hades/shared';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EnvironmentModule } from './../environment.module';
import * as fs from 'fs';

@Module({
    imports: [
        CqrsModule,
        EnvironmentModule,
        PassportModule,
        JwtModule.register({
            privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
            publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
            signOptions: {
                algorithm: 'RS256',
            }
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