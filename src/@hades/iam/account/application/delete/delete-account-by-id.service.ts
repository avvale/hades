import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { AccountId } from './../../domain/value-objects';
import { IAccountRepository } from './../../domain/account.repository';

@Injectable()
export class DeleteAccountByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAccountRepository
    ) {}

    public async main(id: AccountId): Promise<void>
    {
        // get object to delete
        const account = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const accountRegister = this.publisher.mergeObjectContext(account);
        
        accountRegister.deleted(account); // apply event to model events
        accountRegister.commit(); // commit all events of model
    }
}