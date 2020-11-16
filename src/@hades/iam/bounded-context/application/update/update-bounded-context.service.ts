import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import {
    BoundedContextId,
    BoundedContextName,
    BoundedContextRoot,
    BoundedContextSort,
    BoundedContextIsActive,
    BoundedContextCreatedAt,
    BoundedContextUpdatedAt,
    BoundedContextDeletedAt,
} from './../../domain/value-objects';
import { IBoundedContextRepository } from './../../domain/bounded-context.repository';
import { IamBoundedContext } from './../../domain/bounded-context.aggregate';

@Injectable()
export class UpdateBoundedContextService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IBoundedContextRepository,
    ) {}

    public async main(
        payload: {
            id: BoundedContextId,
            name?: BoundedContextName,
            root?: BoundedContextRoot,
            sort?: BoundedContextSort,
            isActive?: BoundedContextIsActive,
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const boundedContext = IamBoundedContext.register(
            payload.id,
            payload.name,
            payload.root,
            payload.sort,
            payload.isActive,
            null,
            new BoundedContextUpdatedAt({currentTimestamp: true}),
            null
        );

        // update
        await this.repository.update(boundedContext, constraint, cQMetadata);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const boundedContextRegister = this.publisher.mergeObjectContext(
            boundedContext
        );

        boundedContextRegister.updated(boundedContext); // apply event to model events
        boundedContextRegister.commit(); // commit all events of model
    }
}