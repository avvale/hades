import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAttachmentFamiliesCommand } from './delete-attachment-families.command';
import { DeleteAttachmentFamiliesService } from './delete-attachment-families.service';

@CommandHandler(DeleteAttachmentFamiliesCommand)
export class DeleteAttachmentFamiliesCommandHandler implements ICommandHandler<DeleteAttachmentFamiliesCommand>
{
    constructor(
        private readonly deleteAttachmentFamiliesService: DeleteAttachmentFamiliesService,
    ) {}

    async execute(command: DeleteAttachmentFamiliesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAttachmentFamiliesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}