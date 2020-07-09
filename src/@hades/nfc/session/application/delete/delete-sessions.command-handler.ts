import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSessionsCommand } from './delete-sessions.command';
import { DeleteSessionsService } from './delete-sessions.service';

@CommandHandler(DeleteSessionsCommand)
export class DeleteSessionsCommandHandler implements ICommandHandler<DeleteSessionsCommand>
{
    constructor(
        private readonly deleteSessionsService: DeleteSessionsService
    ) { }

    async execute(command: DeleteSessionsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteSessionsService.main(command.queryStatements);
    }
}