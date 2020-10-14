import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteChannelByIdCommand } from './delete-channel-by-id.command';
import { DeleteChannelByIdService } from './delete-channel-by-id.service';
import { 
    ChannelId
} from './../../domain/value-objects';

@CommandHandler(DeleteChannelByIdCommand)
export class DeleteChannelByIdCommandHandler implements ICommandHandler<DeleteChannelByIdCommand>
{
    constructor(
        private readonly deleteChannelByIdService: DeleteChannelByIdService
    ) { }

    async execute(command: DeleteChannelByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteChannelByIdService.main(
            new ChannelId(command.id)
        );
    }
}