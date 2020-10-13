import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteChannelsCommand } from './delete-channels.command';
import { DeleteChannelsService } from './delete-channels.service';

@CommandHandler(DeleteChannelsCommand)
export class DeleteChannelsCommandHandler implements ICommandHandler<DeleteChannelsCommand>
{
    constructor(
        private readonly deleteChannelsService: DeleteChannelsService
    ) { }

    async execute(command: DeleteChannelsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteChannelsService.main(command.queryStatement, command.constraint);
    }
}