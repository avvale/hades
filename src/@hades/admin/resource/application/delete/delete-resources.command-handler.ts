import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteResourcesCommand } from './delete-resources.command';
import { DeleteResourcesService } from './delete-resources.service';

@CommandHandler(DeleteResourcesCommand)
export class DeleteResourcesCommandHandler implements ICommandHandler<DeleteResourcesCommand>
{
    constructor(
        private readonly deleteResourcesService: DeleteResourcesService
    ) { }

    async execute(command: DeleteResourcesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteResourcesService.main(command.queryStatements);
    }
}