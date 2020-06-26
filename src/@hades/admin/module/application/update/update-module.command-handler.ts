import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateModuleCommand } from './update-module.command';
import { UpdateModuleService } from './update-module.service';
import { 
    ModuleId, 
    ModuleName, 
    ModuleRoot, 
    ModuleSort, 
    ModuleIsActive
    
} from './../../domain/value-objects';

@CommandHandler(UpdateModuleCommand)
export class UpdateModuleCommandHandler implements ICommandHandler<UpdateModuleCommand>
{
    constructor(
        private readonly updateModuleService: UpdateModuleService
    ) { }

    async execute(command: UpdateModuleCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateModuleService.main(
            new ModuleId(command.id),
            new ModuleName(command.name, { undefinable: true }),
            new ModuleRoot(command.root, { undefinable: true }),
            new ModuleSort(command.sort, { undefinable: true }),
            new ModuleIsActive(command.isActive, { undefinable: true }),
            
        )
    }
}