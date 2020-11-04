import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteChannelDetailByIdCommand } from './delete-channel-detail-by-id.command';
import { DeleteChannelDetailByIdService } from './delete-channel-detail-by-id.service';
import {
    ChannelDetailId
} from './../../domain/value-objects';

@CommandHandler(DeleteChannelDetailByIdCommand)
export class DeleteChannelDetailByIdCommandHandler implements ICommandHandler<DeleteChannelDetailByIdCommand>
{
    constructor(
        private readonly deleteChannelDetailByIdService: DeleteChannelDetailByIdService,
    ) {}

    async execute(command: DeleteChannelDetailByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteChannelDetailByIdService.main(
            new ChannelDetailId(command.id),
            command.constraint,
            command.cQMetadata
        );
    }
}