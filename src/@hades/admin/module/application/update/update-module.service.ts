import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    ModuleId, 
    ModuleName, 
    ModuleRoot, 
    ModuleSort, 
    ModuleIsActive, 
    ModuleCreatedAt, 
    ModuleUpdatedAt, 
    ModuleDeletedAt
    
} from './../../domain/value-objects';
import { IModuleRepository } from './../../domain/module.repository';
import { AdminModule } from './../../domain/module.entity';

@Injectable()
export class UpdateModuleService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IModuleRepository
    ) {}

    public async main(
        id: ModuleId,
        name?: ModuleName,
        root?: ModuleRoot,
        sort?: ModuleSort,
        isActive?: ModuleIsActive,
        
    ): Promise<void>
    {        
        // create object with factory pattern
        const module = AdminModule.register(
            id,
            name,
            root,
            sort,
            isActive,
            null,
            new ModuleUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(module);        
            
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        const moduleRegister = this.publisher.mergeObjectContext(
            await this.repository.findById(id)
        );
        
        moduleRegister.updated(module); // apply event to model events
        moduleRegister.commit(); // commit all events of model
    }
}