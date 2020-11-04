import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteChannelOverviewByIdCommand } from './delete-channel-overview-by-id.command';
import { DeleteChannelOverviewByIdService } from './delete-channel-overview-by-id.service';
import {
    ChannelOverviewId
} from './../../domain/value-objects';

@CommandHandler(DeleteChannelOverviewByIdCommand)
export class DeleteChannelOverviewByIdCommandHandler implements ICommandHandler<DeleteChannelOverviewByIdCommand>
{
    constructor(
        private readonly deleteChannelOverviewByIdService: DeleteChannelOverviewByIdService,
    ) {}

    async execute(command: DeleteChannelOverviewByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteChannelOverviewByIdService.main(
            new ChannelOverviewId(command.id),
            command.constraint,
            command.cQMetadata
        );
    }
}