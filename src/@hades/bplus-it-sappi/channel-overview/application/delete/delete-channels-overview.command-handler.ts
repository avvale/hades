import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteChannelsOverviewCommand } from './delete-channels-overview.command';
import { DeleteChannelsOverviewService } from './delete-channels-overview.service';

@CommandHandler(DeleteChannelsOverviewCommand)
export class DeleteChannelsOverviewCommandHandler implements ICommandHandler<DeleteChannelsOverviewCommand>
{
    constructor(
        private readonly deleteChannelsOverviewService: DeleteChannelsOverviewService
    ) { }

    async execute(command: DeleteChannelsOverviewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteChannelsOverviewService.main(command.queryStatements);
    }
}