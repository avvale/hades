import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { ResourceId } from './../../domain/value-objects';
import { IResourceRepository } from './../../domain/resource.repository';

@Injectable()
export class DeleteResourceByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IResourceRepository,
    ) {}

    public async main(id: ResourceId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const resource = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const resourceRegister = this.publisher.mergeObjectContext(resource);

        resourceRegister.deleted(resource); // apply event to model events
        resourceRegister.commit(); // commit all events of model
    }
}