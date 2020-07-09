import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteActionsCommand } from './delete-actions.command';
import { DeleteActionsService } from './delete-actions.service';

@CommandHandler(DeleteActionsCommand)
export class DeleteActionsCommandHandler implements ICommandHandler<DeleteActionsCommand>
{
    constructor(
        private readonly deleteActionsService: DeleteActionsService
    ) { }

    async execute(command: DeleteActionsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteActionsService.main(command.queryStatements);
    }
}