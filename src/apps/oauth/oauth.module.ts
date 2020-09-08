import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { OAuthModels, OAuthHandlers, OAuthServices, OAuthRepositories, OAuthSagas } from '@hades/oauth';
import { OAuthCredentialControllers, OAuthCredentialResolvers } from './credential';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([...OAuthModels])
    ],
    controllers: [
        ...OAuthCredentialControllers,
    ],
    providers: [
        ...OAuthHandlers,
        ...OAuthServices,
        ...OAuthRepositories,
        ...OAuthSagas,
        ...OAuthCredentialResolvers,
    ]
})
export class OAuthModule {}