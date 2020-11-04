import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteFlowsCommand } from './delete-flows.command';
import { DeleteFlowsService } from './delete-flows.service';

@CommandHandler(DeleteFlowsCommand)
export class DeleteFlowsCommandHandler implements ICommandHandler<DeleteFlowsCommand>
{
    constructor(
        private readonly deleteFlowsService: DeleteFlowsService,
    ) {}

    async execute(command: DeleteFlowsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteFlowsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}