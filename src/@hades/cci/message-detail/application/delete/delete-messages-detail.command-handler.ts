import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMessagesDetailCommand } from './delete-messages-detail.command';
import { DeleteMessagesDetailService } from './delete-messages-detail.service';

@CommandHandler(DeleteMessagesDetailCommand)
export class DeleteMessagesDetailCommandHandler implements ICommandHandler<DeleteMessagesDetailCommand>
{
    constructor(
        private readonly deleteMessagesDetailService: DeleteMessagesDetailService
    ) { }

    async execute(command: DeleteMessagesDetailCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteMessagesDetailService.main(command.queryStatement);
    }
}