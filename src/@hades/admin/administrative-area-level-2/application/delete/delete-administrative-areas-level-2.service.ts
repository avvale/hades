import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IAdministrativeAreaLevel2Repository } from './../../domain/administrative-area-level-2.repository';
import { AddAdministrativeAreasLevel2ContextEvent } from './../events/add-administrative-areas-level-2-context.event';

@Injectable()
export class DeleteAdministrativeAreasLevel2Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAdministrativeAreaLevel2Repository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const administrativeAreasLevel2 = await this.repository.get(queryStatement, constraint, cQMetadata);

        await this.repository.delete(queryStatement, constraint, cQMetadata);

        // create AddAdministrativeAreasLevel2ContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const administrativeAreasLevel2Registered = this.publisher.mergeObjectContext(new AddAdministrativeAreasLevel2ContextEvent(administrativeAreasLevel2));

        administrativeAreasLevel2Registered.deleted(); // apply event to model events
        administrativeAreasLevel2Registered.commit(); // commit all events of model
    }
}