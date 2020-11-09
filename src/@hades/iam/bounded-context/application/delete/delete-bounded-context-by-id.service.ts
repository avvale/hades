import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { BoundedContextId } from './../../domain/value-objects';
import { IBoundedContextRepository } from './../../domain/bounded-context.repository';

@Injectable()
export class DeleteBoundedContextByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IBoundedContextRepository,
    ) {}

    public async main(id: BoundedContextId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const boundedContext = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const boundedContextRegister = this.publisher.mergeObjectContext(boundedContext);

        boundedContextRegister.deleted(boundedContext); // apply event to model events
        boundedContextRegister.commit(); // commit all events of model
    }
}