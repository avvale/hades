import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IamAccountType, OAuthClientGrantType, OAuthCreateCredentialInput } from './../../../../graphql';
import { CreateCredentialDto } from './../dto/create-credential.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { Utils } from '@hades/shared/domain/lib/utils';
import { CreateAccessTokenCommand } from '@hades/o-auth/access-token/application/create/create-access-token.command';
import { CreateRefreshTokenCommand } from '@hades/o-auth/refresh-token/application/create/create-refresh-token.command';
import { FindAccessTokenQuery } from '@hades/o-auth/access-token/application/find/find-access-token.query';
import { FindClientQuery } from '@hades/o-auth/client/application/find/find-client.query';
import { FindAccountQuery } from '@hades/iam/account/application/find/find-account.query';

@Injectable()
export class ClientCredentialsGrantService
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    async getCredential(payload: OAuthCreateCredentialInput | CreateCredentialDto)
    {
        // get account with email
        const account = await this.queryBus.ask(new FindAccountQuery({
            where: {
                email: payload.email,
                type: IamAccountType.SERVICE,
                isActive: true
            }
        }));

        // if not exist user throw error
        if (!account) throw new UnauthorizedException();

        // get client
        const client = await this.queryBus.ask(new FindClientQuery({
            where: {
                id: account.clientId,
                secret: payload.clientSecret,
                grantType: OAuthClientGrantType.CLIENT_CREDENTIALS
            }
        }));

        // if not exist client throw error
        if (!client) throw new UnauthorizedException();

        // create a JWT access tToken
        const accessTokenId = Utils.uuid();
        await this.commandBus.dispatch(new CreateAccessTokenCommand(
            {
                id: accessTokenId,
                clientId: client.id,
                accountId: account.id,
                name: client.name,
                expiredAccessToken: client.expiredAccessToken,
            }
        ));

        // create a JWT refresh tToken
        await this.commandBus.dispatch(new CreateRefreshTokenCommand(
            Utils.uuid(),
            accessTokenId,
            client.expiredRefreshToken
        ));

        // find token created with refreshtoken associated
        const accessToken = await this.queryBus.ask(new FindAccessTokenQuery(
            {
                where: {
                    id: accessTokenId
                },
                include: ['refreshToken']
            }
        ));

        return {
            accessToken: accessToken.token,
            refreshToken: accessToken.refreshToken.token
        }
    }
}