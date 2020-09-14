import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IRefreshTokenRepository } from './../../domain/refresh-token.repository';
import { AddRefreshTokensContextEvent } from './../events/add-refresh-tokens-context.event';

@Injectable()
export class DeleteRefreshTokensService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRefreshTokenRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const refreshTokens = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);

        // create AddRefreshTokensContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const refreshTokensRegistered = this.publisher.mergeObjectContext(new AddRefreshTokensContextEvent(refreshTokens));

        refreshTokensRegistered.deleted(); // apply event to model events
        refreshTokensRegistered.commit(); // commit all events of modelx
    }
}