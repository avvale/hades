import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteChannelsDetailCommand } from './delete-channels-detail.command';
import { DeleteChannelsDetailService } from './delete-channels-detail.service';

@CommandHandler(DeleteChannelsDetailCommand)
export class DeleteChannelsDetailCommandHandler implements ICommandHandler<DeleteChannelsDetailCommand>
{
    constructor(
        private readonly deleteChannelsDetailService: DeleteChannelsDetailService
    ) { }

    async execute(command: DeleteChannelsDetailCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteChannelsDetailService.main(command.queryStatements);
    }
}