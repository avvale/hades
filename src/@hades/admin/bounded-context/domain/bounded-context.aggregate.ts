import { AggregateRoot } from '@nestjs/cqrs';
import { 
    BoundedContextId, 
    BoundedContextName, 
    BoundedContextRoot, 
    BoundedContextSort, 
    BoundedContextIsActive, 
    BoundedContextCreatedAt, 
    BoundedContextUpdatedAt, 
    BoundedContextDeletedAt
    
} from './value-objects';
import { CreatedBoundedContextEvent } from './../application/events/created-bounded-context.event';
import { UpdatedBoundedContextEvent } from './../application/events/updated-bounded-context.event';
import { DeletedBoundedContextEvent } from './../application/events/deleted-bounded-context.event';

export class AdminBoundedContext extends AggregateRoot
{
    id: BoundedContextId;
    name: BoundedContextName;
    root: BoundedContextRoot;
    sort: BoundedContextSort;
    isActive: BoundedContextIsActive;
    createdAt: BoundedContextCreatedAt;
    updatedAt: BoundedContextUpdatedAt;
    deletedAt: BoundedContextDeletedAt;
    
    constructor(id?: BoundedContextId, name?: BoundedContextName, root?: BoundedContextRoot, sort?: BoundedContextSort, isActive?: BoundedContextIsActive, createdAt?: BoundedContextCreatedAt, updatedAt?: BoundedContextUpdatedAt, deletedAt?: BoundedContextDeletedAt, )
    {
        super();
        
        this.id = id;
        this.name = name;
        this.root = root;
        this.sort = sort;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: BoundedContextId, name: BoundedContextName, root: BoundedContextRoot, sort: BoundedContextSort, isActive: BoundedContextIsActive, createdAt: BoundedContextCreatedAt, updatedAt: BoundedContextUpdatedAt, deletedAt: BoundedContextDeletedAt, ): AdminBoundedContext
    {
        return new AdminBoundedContext(id, name, root, sort, isActive, createdAt, updatedAt, deletedAt, );
    }

    created(boundedContext: AdminBoundedContext): void
    {
        this.apply(
            new CreatedBoundedContextEvent(
                boundedContext.id.value,
                boundedContext.name.value,
                boundedContext.root.value,
                boundedContext.sort.value,
                boundedContext.isActive.value,
                boundedContext.createdAt?.value,
                boundedContext.updatedAt?.value,
                boundedContext.deletedAt?.value,
                
            )
        );
    }

    updated(boundedContext: AdminBoundedContext): void
    {
        this.apply(
            new UpdatedBoundedContextEvent(
                boundedContext.id.value,
                boundedContext.name?.value,
                boundedContext.root?.value,
                boundedContext.sort?.value,
                boundedContext.isActive?.value,
                boundedContext.createdAt?.value,
                boundedContext.updatedAt?.value,
                boundedContext.deletedAt?.value,
                
            )
        );
    }

    deleted(boundedContext: AdminBoundedContext): void
    {
        this.apply(
            new DeletedBoundedContextEvent(
                boundedContext.id.value,
                boundedContext.name.value,
                boundedContext.root.value,
                boundedContext.sort.value,
                boundedContext.isActive.value,
                boundedContext.createdAt?.value,
                boundedContext.updatedAt?.value,
                boundedContext.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            name: this.name.value,
            root: this.root.value,
            sort: this.sort.value,
            isActive: this.isActive.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
