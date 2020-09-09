import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { OAuthModels, OAuthHandlers, OAuthServices, OAuthRepositories, OAuthSagas } from '@hades/o-auth';
import { OAuthCredentialControllers, OAuthCredentialResolvers } from './credential';
import { OAuthApplicationControllers, OAuthApplicationResolvers } from './application';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([...OAuthModels])
    ],
    controllers: [
        ...OAuthCredentialControllers,
        ...OAuthApplicationControllers
    ],
    providers: [
        ...OAuthHandlers,
        ...OAuthServices,
        ...OAuthRepositories,
        ...OAuthSagas,
        ...OAuthCredentialResolvers,
        ...OAuthApplicationResolvers
    ]
})
export class OAuthModule {}