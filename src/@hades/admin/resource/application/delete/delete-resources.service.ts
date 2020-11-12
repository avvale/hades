import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IResourceRepository } from './../../domain/resource.repository';
import { AddResourcesContextEvent } from './../events/add-resources-context.event';

@Injectable()
export class DeleteResourcesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IResourceRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const resources = await this.repository.get(queryStatement, constraint, cQMetadata);

        await this.repository.delete(queryStatement, constraint, cQMetadata);

        // create AddResourcesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const resourcesRegistered = this.publisher.mergeObjectContext(new AddResourcesContextEvent(resources));

        resourcesRegistered.deleted(); // apply event to model events
        resourcesRegistered.commit(); // commit all events of model
    }
}