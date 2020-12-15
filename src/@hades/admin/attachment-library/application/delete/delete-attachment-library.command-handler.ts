import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAttachmentLibraryCommand } from './delete-attachment-library.command';
import { DeleteAttachmentLibraryService } from './delete-attachment-library.service';

@CommandHandler(DeleteAttachmentLibraryCommand)
export class DeleteAttachmentLibraryCommandHandler implements ICommandHandler<DeleteAttachmentLibraryCommand>
{
    constructor(
        private readonly deleteAttachmentLibraryService: DeleteAttachmentLibraryService,
    ) {}

    async execute(command: DeleteAttachmentLibraryCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAttachmentLibraryService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}