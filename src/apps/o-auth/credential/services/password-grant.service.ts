import { Injectable, UnauthorizedException } from "@nestjs/common";
import { OAuthCreateCredentialInput } from './../../../../graphql';
import { CreateCredentialDto } from './../dto/create-credential.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { Utils } from '@hades/shared/domain/lib/utils';
import { FindApplicationByAuthorizationHeaderQuery } from '@hades/o-auth/application/application/find/find-application-by-authorization-header.query';
import { FindUserByUsernamePasswordQuery } from '@hades/iam/user/application/find/find-user-by-username-password.query';
import { CreateAccessTokenCommand } from '@hades/o-auth/access-token/application/create/create-access-token.command';
import { CreateRefreshTokenCommand } from '@hades/o-auth/refresh-token/application/create/create-refresh-token.command';
import { FindAccessTokenQuery } from '@hades/o-auth/access-token/application/find/find-access-token.query';

@Injectable()
export class PasswordGrantService
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    async getCredential(payload: OAuthCreateCredentialInput | CreateCredentialDto, authorization: string)
    {
        // get user with username and password
        const user = await this.queryBus.ask(new FindUserByUsernamePasswordQuery(payload.username, payload.password));

        // if not exist user throw error
        if (!user) throw new UnauthorizedException();

        // get application and clients with header authorization basic authentication
        const application = await this.queryBus.ask(new FindApplicationByAuthorizationHeaderQuery(authorization));

        // if not exist application throw error
        if (!application) throw new UnauthorizedException();

        // TODO, como determinar a que cliente se autentifica??
        // get client associated with this application
        const client = application.clients.find(client => client.id === user.account.clientId);

        // if not exist client throw error
        if (!client) throw new UnauthorizedException();

        // create a JWT access tToken
        const accessTokenId = Utils.uuid();
        await this.commandBus.dispatch(new CreateAccessTokenCommand(
            {
                id: accessTokenId,
                clientId: client.id,
                accountId: user.account.id,
                name: client.name,
                expiredAccessToken: client.expiredAccessToken,
            }
        ));

        // create a JWT refresh tToken
        await this.commandBus.dispatch(new CreateRefreshTokenCommand(
            {
                id: Utils.uuid(),
                accessTokenId: accessTokenId,
                expiredRefreshToken: client.expiredRefreshToken,
            }
        ));

        // find token created with refreshToken associated
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