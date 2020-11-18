import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAttachmentByIdCommand } from './delete-attachment-by-id.command';
import { DeleteAttachmentByIdService } from './delete-attachment-by-id.service';
import {
    AttachmentId
} from './../../domain/value-objects';

@CommandHandler(DeleteAttachmentByIdCommand)
export class DeleteAttachmentByIdCommandHandler implements ICommandHandler<DeleteAttachmentByIdCommand>
{
    constructor(
        private readonly deleteAttachmentByIdService: DeleteAttachmentByIdService,
    ) {}

    async execute(command: DeleteAttachmentByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAttachmentByIdService.main(
            new AttachmentId(command.id),
            command.constraint,
            command.cQMetadata
        );
    }
}