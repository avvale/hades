import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAttachmentFamiliesCommand } from './create-attachment-families.command';
import { CreateAttachmentFamiliesService } from './create-attachment-families.service';
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

@CommandHandler(CreateAttachmentFamiliesCommand)
export class CreateAttachmentFamiliesCommandHandler implements ICommandHandler<CreateAttachmentFamiliesCommand>
{
    constructor(
        private readonly createAttachmentFamiliesService: CreateAttachmentFamiliesService,
    ) {}

    async execute(command: CreateAttachmentFamiliesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAttachmentFamiliesService.main(
            command.payload
                .map(attachmentFamily => {
                    return {
                        id: new AttachmentFamilyId(attachmentFamily.id),
                        name: new AttachmentFamilyName(attachmentFamily.name),
                        resourceIds: new AttachmentFamilyResourceIds(attachmentFamily.resourceIds),
                        width: new AttachmentFamilyWidth(attachmentFamily.width),
                        height: new AttachmentFamilyHeight(attachmentFamily.height),
                        fit: new AttachmentFamilyFit(attachmentFamily.fit),
                        sizes: new AttachmentFamilySizes(attachmentFamily.sizes),
                        quality: new AttachmentFamilyQuality(attachmentFamily.quality),
                        format: new AttachmentFamilyFormat(attachmentFamily.format),
                    }
                })
        );
    }
}