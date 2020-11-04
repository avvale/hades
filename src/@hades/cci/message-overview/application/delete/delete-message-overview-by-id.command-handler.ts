import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMessageOverviewByIdCommand } from './delete-message-overview-by-id.command';
import { DeleteMessageOverviewByIdService } from './delete-message-overview-by-id.service';
import {
    MessageOverviewId
} from './../../domain/value-objects';

@CommandHandler(DeleteMessageOverviewByIdCommand)
export class DeleteMessageOverviewByIdCommandHandler implements ICommandHandler<DeleteMessageOverviewByIdCommand>
{
    constructor(
        private readonly deleteMessageOverviewByIdService: DeleteMessageOverviewByIdService,
    ) {}

    async execute(command: DeleteMessageOverviewByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteMessageOverviewByIdService.main(
            new MessageOverviewId(command.id),
            command.constraint,
            command.cQMetadata
        );
    }
}