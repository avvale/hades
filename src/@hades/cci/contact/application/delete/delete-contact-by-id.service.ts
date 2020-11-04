import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { ContactId } from './../../domain/value-objects';
import { IContactRepository } from './../../domain/contact.repository';

@Injectable()
export class DeleteContactByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IContactRepository,
    ) {}

    public async main(id: ContactId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const contact = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const contactRegister = this.publisher.mergeObjectContext(contact);

        contactRegister.deleted(contact); // apply event to model events
        contactRegister.commit(); // commit all events of model
    }
}