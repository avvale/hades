import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    BoundedContextId, 
    BoundedContextName, 
    BoundedContextRoot, 
    BoundedContextSort, 
    BoundedContextIsActive, 
    BoundedContextCreatedAt, 
    BoundedContextUpdatedAt, 
    BoundedContextDeletedAt
    
} from './../../domain/value-objects';
import { IBoundedContextRepository } from '../../domain/bounded-context.repository';
import { AdminBoundedContext } from './../../domain/bounded-context.aggregate';

@Injectable()
export class InsertBoundedContextsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IBoundedContextRepository
    ) {}

    public async main(
        boundedContexts: {
            id: BoundedContextId,
            name: BoundedContextName,
            root: BoundedContextRoot,
            sort: BoundedContextSort,
            isActive: BoundedContextIsActive,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregateBoundedContexts = boundedContexts.map(boundedContext => AdminBoundedContext.register(
            boundedContext.id,
            boundedContext.name,
            boundedContext.root,
            boundedContext.sort,
            boundedContext.isActive,
            new BoundedContextCreatedAt(Utils.nowTimestamp()),
            new BoundedContextUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateBoundedContexts);

        // TODO a falta de definir eventos
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        // const boundedContextsRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id)
        // );
        // 
        // boundedContextsRegistered.created(boundedContexts); // apply event to model events
        // boundedContextsRegistered.commit(); // commit all events of model
    }
}