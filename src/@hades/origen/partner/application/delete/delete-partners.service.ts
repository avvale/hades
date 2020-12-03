import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IPartnerRepository } from './../../domain/partner.repository';
import { AddPartnersContextEvent } from './../events/add-partners-context.event';

@Injectable()
export class DeletePartnersService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IPartnerRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const partners = await this.repository.get(queryStatement, constraint, cQMetadata);

        await this.repository.delete(queryStatement, constraint, cQMetadata);

        // create AddPartnersContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const partnersRegistered = this.publisher.mergeObjectContext(new AddPartnersContextEvent(partners));

        partnersRegistered.deleted(); // apply event to model events
        partnersRegistered.commit(); // commit all events of model
    }
}