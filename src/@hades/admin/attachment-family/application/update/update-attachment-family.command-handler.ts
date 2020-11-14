import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAttachmentFamilyCommand } from './update-attachment-family.command';
import { UpdateAttachmentFamilyService } from './update-attachment-family.service';
import {
    AttachmentFamilyId,
    AttachmentFamilyName,
    AttachmentFamilyResourceIds,
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

@CommandHandler(UpdateAttachmentFamilyCommand)
export class UpdateAttachmentFamilyCommandHandler implements ICommandHandler<UpdateAttachmentFamilyCommand>
{
    constructor(
        private readonly updateAttachmentFamilyService: UpdateAttachmentFamilyService,
    ) {}

    async execute(command: UpdateAttachmentFamilyCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAttachmentFamilyService.main(
            {
                id: new AttachmentFamilyId(command.payload.id),
                name: new AttachmentFamilyName(command.payload.name, { undefinable: true }),
                resourceIds: new AttachmentFamilyResourceIds(command.payload.resourceIds),
                width: new AttachmentFamilyWidth(command.payload.width),
                height: new AttachmentFamilyHeight(command.payload.height),
                fit: new AttachmentFamilyFit(command.payload.fit, { undefinable: true }),
                sizes: new AttachmentFamilySizes(command.payload.sizes),
                quality: new AttachmentFamilyQuality(command.payload.quality),
                format: new AttachmentFamilyFormat(command.payload.format),
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}