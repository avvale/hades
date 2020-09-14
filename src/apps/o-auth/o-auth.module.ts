import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { OAuthModels, OAuthHandlers, OAuthServices, OAuthRepositories, OAuthSagas } from '@hades/o-auth';
import { OAuthCredentialControllers, OAuthCredentialResolvers } from './credential';
import { OAuthApplicationControllers, OAuthApplicationResolvers } from './application';
import { OAuthClientControllers, OAuthClientResolvers } from './client';
import { OAuthAccessTokenControllers, OAuthAccessTokenResolvers } from './access-token';
import { OAuthRefreshTokenControllers, OAuthRefreshTokenResolvers } from './refresh-token';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([...OAuthModels])
    ],
    controllers: [
        ...OAuthCredentialControllers,
        ...OAuthApplicationControllers,
        ...OAuthClientControllers,
        ...OAuthAccessTokenControllers,
        ...OAuthRefreshTokenControllers
    ],
    providers: [
        ...OAuthHandlers,
        ...OAuthServices,
        ...OAuthRepositories,
        ...OAuthSagas,
        ...OAuthCredentialResolvers,
        ...OAuthApplicationResolvers,
        ...OAuthClientResolvers,
        ...OAuthAccessTokenResolvers,
        ...OAuthRefreshTokenResolvers
    ]
})
export class OAuthModule {}