import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { OAuthModels, OAuthHandlers, OAuthServices, OAuthRepositories, OAuthSagas } from '@hades/o-auth';
import { OAuthApplicationControllers, OAuthApplicationResolvers } from './application';
import { OAuthClientControllers, OAuthClientResolvers } from './client';
import { OAuthAccessTokenControllers, OAuthAccessTokenResolvers } from './access-token';
import { OAuthRefreshTokenControllers, OAuthRefreshTokenResolvers } from './refresh-token';
import { OAuthCredentialControllers, OAuthCredentialResolvers } from './credential';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([...OAuthModels])
    ],
    controllers: [
        ...OAuthApplicationControllers,
        ...OAuthClientControllers,
        ...OAuthAccessTokenControllers,
        ...OAuthRefreshTokenControllers,
        ...OAuthCredentialControllers
    ],
    providers: [
        ...OAuthHandlers,
        ...OAuthServices,
        ...OAuthRepositories,
        ...OAuthSagas,
        ...OAuthApplicationResolvers,
        ...OAuthClientResolvers,
        ...OAuthAccessTokenResolvers,
        ...OAuthRefreshTokenResolvers,
        ...OAuthCredentialResolvers
    ]
})
export class OAuthModule {}