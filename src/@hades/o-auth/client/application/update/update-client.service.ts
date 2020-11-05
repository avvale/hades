import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import {
    ClientId,
    ClientGrantType,
    ClientName,
    ClientSecret,
    ClientAuthUrl,
    ClientRedirect,
    ClientExpiredAccessToken,
    ClientExpiredRefreshToken,
    ClientIsActive,
    ClientIsMaster,
    ClientApplicationIds,
    ClientCreatedAt,
    ClientUpdatedAt,
    ClientDeletedAt,
} from './../../domain/value-objects';
import { IClientRepository } from './../../domain/client.repository';
import { OAuthClient } from './../../domain/client.aggregate';

@Injectable()
export class UpdateClientService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IClientRepository,
    ) {}

    public async main(
        payload: {
            id: ClientId,
            grantType?: ClientGrantType,
            name?: ClientName,
            secret?: ClientSecret,
            authUrl?: ClientAuthUrl,
            redirect?: ClientRedirect,
            expiredAccessToken?: ClientExpiredAccessToken,
            expiredRefreshToken?: ClientExpiredRefreshToken,
            isActive?: ClientIsActive,
            isMaster?: ClientIsMaster,
            applicationIds?: ClientApplicationIds,
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const client = OAuthClient.register(
            payload.id,
            payload.grantType,
            payload.name,
            payload.secret,
            payload.authUrl,
            payload.redirect,
            payload.expiredAccessToken,
            payload.expiredRefreshToken,
            payload.isActive,
            payload.isMaster,
            payload.applicationIds,
            null,
            new ClientUpdatedAt({currentTimestamp: true}),
            null
        );

        // update
        await this.repository.update(client, constraint, cQMetadata);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const clientRegister = this.publisher.mergeObjectContext(
            client
        );

        clientRegister.updated(client); // apply event to model events
        clientRegister.commit(); // commit all events of model
    }
}