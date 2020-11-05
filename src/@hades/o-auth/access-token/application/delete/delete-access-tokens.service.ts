import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IAccessTokenRepository } from './../../domain/access-token.repository';
import { AddAccessTokensContextEvent } from './../events/add-access-tokens-context.event';

@Injectable()
export class DeleteAccessTokensService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAccessTokenRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const accessTokens = await this.repository.get(queryStatement, constraint, cQMetadata);

        await this.repository.delete(queryStatement, constraint, cQMetadata);

        // create AddAccessTokensContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const accessTokensRegistered = this.publisher.mergeObjectContext(new AddAccessTokensContextEvent(accessTokens));

        accessTokensRegistered.deleted(); // apply event to model events
        accessTokensRegistered.commit(); // commit all events of model
    }
}