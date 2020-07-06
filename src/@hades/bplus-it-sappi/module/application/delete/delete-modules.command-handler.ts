import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteModulesCommand } from './delete-modules.command';
import { DeleteModulesService } from './delete-modules.service';

@CommandHandler(DeleteModulesCommand)
export class DeleteModulesCommandHandler implements ICommandHandler<DeleteModulesCommand>
{
    constructor(
        private readonly deleteModulesService: DeleteModulesService
    ) { }

    async execute(command: DeleteModulesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteModulesService.main(command.queryStatements);
    }
}