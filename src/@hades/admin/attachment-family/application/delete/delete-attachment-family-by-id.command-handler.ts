import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAttachmentFamilyByIdCommand } from './delete-attachment-family-by-id.command';
import { DeleteAttachmentFamilyByIdService } from './delete-attachment-family-by-id.service';
import {
    AttachmentFamilyId
} from './../../domain/value-objects';

@CommandHandler(DeleteAttachmentFamilyByIdCommand)
export class DeleteAttachmentFamilyByIdCommandHandler implements ICommandHandler<DeleteAttachmentFamilyByIdCommand>
{
    constructor(
        private readonly deleteAttachmentFamilyByIdService: DeleteAttachmentFamilyByIdService,
    ) {}

    async execute(command: DeleteAttachmentFamilyByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAttachmentFamilyByIdService.main(
            new AttachmentFamilyId(command.id),
            command.constraint,
            command.cQMetadata
        );
    }
}