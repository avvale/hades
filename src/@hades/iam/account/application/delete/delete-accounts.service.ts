import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IAccountRepository } from './../../domain/account.repository';
import { AddAccountsContextEvent } from './../events/add-accounts-context.event';

@Injectable()
export class DeleteAccountsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAccountRepository,
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<void>
    {
        // get object to delete
        const accounts = await this.repository.get(queryStatement);

        await this.repository.delete(queryStatement);

        // create AddAccountsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const accountsRegistered = this.publisher.mergeObjectContext(new AddAccountsContextEvent(accounts));

        accountsRegistered.deleted(); // apply event to model events
        accountsRegistered.commit(); // commit all events of model
    }
}