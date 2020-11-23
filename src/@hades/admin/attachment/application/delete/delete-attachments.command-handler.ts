import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAttachmentsCommand } from './delete-attachments.command';
import { DeleteAttachmentsService } from './delete-attachments.service';

@CommandHandler(DeleteAttachmentsCommand)
export class DeleteAttachmentsCommandHandler implements ICommandHandler<DeleteAttachmentsCommand>
{
    constructor(
        private readonly deleteAttachmentsService: DeleteAttachmentsService,
    ) {}

    async execute(command: DeleteAttachmentsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAttachmentsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}