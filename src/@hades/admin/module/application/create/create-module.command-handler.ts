import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateModuleCommand } from './create-module.command';
import { CreateModuleService } from './create-module.service';
import { 
    ModuleId, 
    ModuleName, 
    ModuleRoot, 
    ModuleSort, 
    ModuleIsActive
    
} from './../../domain/value-objects';

@CommandHandler(CreateModuleCommand)
export class CreateModuleCommandHandler implements ICommandHandler<CreateModuleCommand>
{
    constructor(
        private readonly createModuleService: CreateModuleService
    ) { }

    async execute(command: CreateModuleCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createModuleService.main(
            new ModuleId(command.id),
            new ModuleName(command.name),
            new ModuleRoot(command.root),
            new ModuleSort(command.sort),
            new ModuleIsActive(command.isActive),
            
        );
    }
}