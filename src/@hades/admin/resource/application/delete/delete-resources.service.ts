import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IResourceRepository } from './../../domain/resource.repository';
import { AddResourcesContextEvent } from './../events/add-resources-context.event';

@Injectable()
export class DeleteResourcesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IResourceRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const resources = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);

        // create AddResourcesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const resourcesRegistered = this.publisher.mergeObjectContext(new AddResourcesContextEvent(resources));

        resourcesRegistered.deleted(); // apply event to model events
        resourcesRegistered.commit(); // commit all events of modelx
    }
}