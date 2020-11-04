import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSystemsCommand } from './delete-systems.command';
import { DeleteSystemsService } from './delete-systems.service';

@CommandHandler(DeleteSystemsCommand)
export class DeleteSystemsCommandHandler implements ICommandHandler<DeleteSystemsCommand>
{
    constructor(
        private readonly deleteSystemsService: DeleteSystemsService,
    ) {}

    async execute(command: DeleteSystemsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteSystemsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}