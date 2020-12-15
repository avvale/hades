import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAttachmentLibrariesCommand } from './delete-attachment-libraries.command';
import { DeleteAttachmentLibrariesService } from './delete-attachment-libraries.service';

@CommandHandler(DeleteAttachmentLibrariesCommand)
export class DeleteAttachmentLibrariesCommandHandler implements ICommandHandler<DeleteAttachmentLibrariesCommand>
{
    constructor(
        private readonly deleteAttachmentLibrariesService: DeleteAttachmentLibrariesService,
    ) {}

    async execute(command: DeleteAttachmentLibrariesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAttachmentLibrariesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}