import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMessageDetailByIdCommand } from './delete-message-detail-by-id.command';
import { DeleteMessageDetailByIdService } from './delete-message-detail-by-id.service';
import {
    MessageDetailId
} from './../../domain/value-objects';

@CommandHandler(DeleteMessageDetailByIdCommand)
export class DeleteMessageDetailByIdCommandHandler implements ICommandHandler<DeleteMessageDetailByIdCommand>
{
    constructor(
        private readonly deleteMessageDetailByIdService: DeleteMessageDetailByIdService,
    ) {}

    async execute(command: DeleteMessageDetailByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteMessageDetailByIdService.main(
            new MessageDetailId(command.id),
            command.constraint,
            command.cQMetadata
        );
    }
}