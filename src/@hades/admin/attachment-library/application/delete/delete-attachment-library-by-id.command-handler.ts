import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAttachmentLibraryByIdCommand } from './delete-attachment-library-by-id.command';
import { DeleteAttachmentLibraryByIdService } from './delete-attachment-library-by-id.service';
import {
    AttachmentLibraryId
} from './../../domain/value-objects';

@CommandHandler(DeleteAttachmentLibraryByIdCommand)
export class DeleteAttachmentLibraryByIdCommandHandler implements ICommandHandler<DeleteAttachmentLibraryByIdCommand>
{
    constructor(
        private readonly deleteAttachmentLibraryByIdService: DeleteAttachmentLibraryByIdService,
    ) {}

    async execute(command: DeleteAttachmentLibraryByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAttachmentLibraryByIdService.main(
            new AttachmentLibraryId(command.id),
            command.constraint,
            command.cQMetadata
        );
    }
}