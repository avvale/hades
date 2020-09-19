import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IRefreshTokenRepository } from './../../domain/refresh-token.repository';
import { AddRefreshTokensContextEvent } from './../events/add-refresh-tokens-context.event';

@Injectable()
export class DeleteRefreshTokensService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRefreshTokenRepository
    ) {}

    public async main(queryStatement: QueryStatement): Promise<void>
    {   
        // get object to delete
        const refreshTokens = await this.repository.get(queryStatement);

        await this.repository.delete(queryStatement);

        // create AddRefreshTokensContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const refreshTokensRegistered = this.publisher.mergeObjectContext(new AddRefreshTokensContextEvent(refreshTokens));

        refreshTokensRegistered.deleted(); // apply event to model events
        refreshTokensRegistered.commit(); // commit all events of model
    }
}