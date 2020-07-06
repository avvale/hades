import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IResourceRepository } from './../../domain/resource.repository';

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

        // TODO a falta de definir eventos
        // insert EventBus in object, to be able to apply and commit events
        // const resourcesRegistered = this.publisher.mergeObjectContext(resources);
        
        // resourcesRegistered.deleted(resources); // apply event to model events
        // resourcesRegistered.commit(); // commit all events of model
    }
}