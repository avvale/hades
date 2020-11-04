import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMessagesOverviewCommand } from './delete-messages-overview.command';
import { DeleteMessagesOverviewService } from './delete-messages-overview.service';

@CommandHandler(DeleteMessagesOverviewCommand)
export class DeleteMessagesOverviewCommandHandler implements ICommandHandler<DeleteMessagesOverviewCommand>
{
    constructor(
        private readonly deleteMessagesOverviewService: DeleteMessagesOverviewService,
    ) {}

    async execute(command: DeleteMessagesOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteMessagesOverviewService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}