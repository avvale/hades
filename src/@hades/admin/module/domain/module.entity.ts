import { AggregateRoot } from '@nestjs/cqrs';
import { 
    ModuleId, 
    ModuleName, 
    ModuleRoot, 
    ModuleSort, 
    ModuleIsActive, 
    ModuleCreatedAt, 
    ModuleUpdatedAt, 
    ModuleDeletedAt
    
} from './value-objects';
import { CreatedModuleEvent } from './../application/events/created-module.event';
import { UpdatedModuleEvent } from './../application/events/updated-module.event';
import { DeletedModuleEvent } from './../application/events/deleted-module.event';

export class AdminModule extends AggregateRoot
{
    id: ModuleId;
    name: ModuleName;
    root: ModuleRoot;
    sort: ModuleSort;
    isActive: ModuleIsActive;
    createdAt: ModuleCreatedAt;
    updatedAt: ModuleUpdatedAt;
    deletedAt: ModuleDeletedAt;
    
    constructor(id?: ModuleId, name?: ModuleName, root?: ModuleRoot, sort?: ModuleSort, isActive?: ModuleIsActive, createdAt?: ModuleCreatedAt, updatedAt?: ModuleUpdatedAt, deletedAt?: ModuleDeletedAt, )
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

    static register (id: ModuleId,name: ModuleName,root: ModuleRoot,sort: ModuleSort,isActive: ModuleIsActive,createdAt: ModuleCreatedAt,updatedAt: ModuleUpdatedAt,deletedAt: ModuleDeletedAt,): AdminModule
    {
        return new AdminModule(id, name, root, sort, isActive, createdAt, updatedAt, deletedAt, );
    }

    created(module: AdminModule): void
    {
        this.apply(
            new CreatedModuleEvent(
                module.id.value,
                module.name.value,
                module.root.value,
                module.sort.value,
                module.isActive.value,
                module.createdAt?.value,
                module.updatedAt?.value,
                module.deletedAt?.value,
                
            )
        );
    }

    updated(module: AdminModule): void
    {
        this.apply(
            new UpdatedModuleEvent(
                module.id.value,
                module.name?.value,
                module.root?.value,
                module.sort?.value,
                module.isActive?.value,
                module.createdAt?.value,
                module.updatedAt?.value,
                module.deletedAt?.value,
                
            )
        );
    }

    deleted(module: AdminModule): void
    {
        this.apply(
            new DeletedModuleEvent(
                module.id.value,
                module.name.value,
                module.root.value,
                module.sort.value,
                module.isActive.value,
                module.createdAt?.value,
                module.updatedAt?.value,
                module.deletedAt?.value,
                
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
