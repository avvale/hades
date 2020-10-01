import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteModuleByIdCommand } from './delete-module-by-id.command';
import { DeleteModuleByIdService } from './delete-module-by-id.service';
import { 
    ModuleId
} from './../../domain/value-objects';

@CommandHandler(DeleteModuleByIdCommand)
export class DeleteModuleByIdCommandHandler implements ICommandHandler<DeleteModuleByIdCommand>
{
    constructor(
        private readonly deleteModuleByIdService: DeleteModuleByIdService
    ) { }

    async execute(command: DeleteModuleByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteModuleByIdService.main(
            new ModuleId(command.id)
        );
    }
}