import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { AccountId } from './../../domain/value-objects';
import { IAccountRepository } from './../../domain/account.repository';

@Injectable()
export class DeleteAccountByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAccountRepository,
    ) {}

    public async main(id: AccountId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const account = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const accountRegister = this.publisher.mergeObjectContext(account);

        accountRegister.deleted(account); // apply event to model events
        accountRegister.commit(); // commit all events of model
    }
}