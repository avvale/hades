import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteExecutionsCommand } from './delete-executions.command';
import { DeleteExecutionsService } from './delete-executions.service';

@CommandHandler(DeleteExecutionsCommand)
export class DeleteExecutionsCommandHandler implements ICommandHandler<DeleteExecutionsCommand>
{
    constructor(
        private readonly deleteExecutionsService: DeleteExecutionsService
    ) { }

    async execute(command: DeleteExecutionsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteExecutionsService.main(command.queryStatement);
    }
}