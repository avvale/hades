import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    AccessTokenId,
    AccessTokenClientId,
    AccessTokenAccountId,
    AccessTokenToken,
    AccessTokenName,
    AccessTokenIsRevoked,
    AccessTokenExpiresAt,
    AccessTokenCreatedAt,
    AccessTokenUpdatedAt,
    AccessTokenDeletedAt,
} from './../../domain/value-objects';
import { IAccessTokenRepository } from './../../domain/access-token.repository';
import { OAuthAccessToken } from './../../domain/access-token.aggregate';
import { AddAccessTokensContextEvent } from './../events/add-access-tokens-context.event';

@Injectable()
export class CreateAccessTokensService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAccessTokenRepository,
    ) {}

    public async main(
        accessTokens: {
            id: AccessTokenId,
            clientId: AccessTokenClientId,
            accountId: AccessTokenAccountId,
            token: AccessTokenToken,
            name: AccessTokenName,
            isRevoked: AccessTokenIsRevoked,
            expiresAt: AccessTokenExpiresAt,
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateAccessTokens = accessTokens.map(accessToken => OAuthAccessToken.register(
            accessToken.id,
            accessToken.clientId,
            accessToken.accountId,
            accessToken.token,
            accessToken.name,
            accessToken.isRevoked,
            accessToken.expiresAt,
            new AccessTokenCreatedAt({currentTimestamp: true}),
            new AccessTokenUpdatedAt({currentTimestamp: true}),
            null
        ));

        // insert
        await this.repository.insert(aggregateAccessTokens);

        // create AddAccessTokensContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const accessTokensRegistered = this.publisher.mergeObjectContext(new AddAccessTokensContextEvent(aggregateAccessTokens));

        accessTokensRegistered.created(); // apply event to model events
        accessTokensRegistered.commit(); // commit all events of model
    }
}