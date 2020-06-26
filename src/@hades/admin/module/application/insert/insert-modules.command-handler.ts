import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertModulesCommand } from './insert-modules.command';
import { InsertModulesService } from './insert-modules.service';
import { 
    ModuleId, 
    ModuleName, 
    ModuleRoot, 
    ModuleSort, 
    ModuleIsActive
    
} from './../../domain/value-objects';

@CommandHandler(InsertModulesCommand)
export class InsertModulesCommandHandler implements ICommandHandler<InsertModulesCommand>
{
    constructor(
        private readonly insertModulesService: InsertModulesService
    ) { }

    async execute(command: InsertModulesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertModulesService.main(
            command.modules
                .map(module => { 
                    return {
                        id: new ModuleId(module.id),
                        name: new ModuleName(module.name),
                        root: new ModuleRoot(module.root),
                        sort: new ModuleSort(module.sort),
                        isActive: new ModuleIsActive(module.isActive),
                        
                    }
                })
        );
    }
}