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
import { IModuleRepository } from '../../domain/module.repository';
import { AdminModule } from './../../domain/module.entity';

@Injectable()
export class InsertModulesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IModuleRepository
    ) {}

    public async main(
        modules: {
            id: ModuleId,
            name: ModuleName,
            root: ModuleRoot,
            sort: ModuleSort,
            isActive: ModuleIsActive,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const entityModules = modules.map(module => AdminModule.register(
            module.id,
            module.name,
            module.root,
            module.sort,
            module.isActive,
            new ModuleCreatedAt(Utils.nowTimestamp()),
            new ModuleUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(entityModules);

        // TODO a falta de definir eventos
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        // const modulesRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id)
        // );
        // 
        // modulesRegistered.created(modules); // apply event to model events
        // modulesRegistered.commit(); // commit all events of model
    }
}