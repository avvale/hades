import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAttachmentFamilyCommand } from './create-attachment-family.command';
import { CreateAttachmentFamilyService } from './create-attachment-family.service';
import {
    AttachmentFamilyId,
    AttachmentFamilyName,
    AttachmentFamilyWidth,
    AttachmentFamilyHeight,
    AttachmentFamilyFit,
    AttachmentFamilySizes,
    AttachmentFamilyQuality,
    AttachmentFamilyFormat,
    AttachmentFamilyCreatedAt,
    AttachmentFamilyUpdatedAt,
    AttachmentFamilyDeletedAt,
} from './../../domain/value-objects';

@CommandHandler(CreateAttachmentFamilyCommand)
export class CreateAttachmentFamilyCommandHandler implements ICommandHandler<CreateAttachmentFamilyCommand>
{
    constructor(
        private readonly createAttachmentFamilyService: CreateAttachmentFamilyService,
    ) {}

    async execute(command: CreateAttachmentFamilyCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAttachmentFamilyService.main(
            {
                id: new AttachmentFamilyId(command.payload.id),
                name: new AttachmentFamilyName(command.payload.name),
                width: new AttachmentFamilyWidth(command.payload.width),
                height: new AttachmentFamilyHeight(command.payload.height),
                fit: new AttachmentFamilyFit(command.payload.fit),
                sizes: new AttachmentFamilySizes(command.payload.sizes),
                quality: new AttachmentFamilyQuality(command.payload.quality),
                format: new AttachmentFamilyFormat(command.payload.format),
            }
        );
    }
}