import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IAccessTokenRepository } from './../../domain/access-token.repository';
import { AddAccessTokensContextEvent } from './../events/add-access-tokens-context.event';

@Injectable()
export class DeleteAccessTokensService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAccessTokenRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const accessTokens = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);

        // create AddAccessTokensContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const accessTokensRegistered = this.publisher.mergeObjectContext(new AddAccessTokensContextEvent(accessTokens));

        accessTokensRegistered.deleted(); // apply event to model events
        accessTokensRegistered.commit(); // commit all events of modelx
    }
}