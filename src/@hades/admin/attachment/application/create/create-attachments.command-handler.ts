import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAttachmentsCommand } from './create-attachments.command';
import { CreateAttachmentsService } from './create-attachments.service';
import {
    AttachmentId,
    AttachmentCommonId,
    AttachmentLangId,
    AttachmentAttachableModel,
    AttachmentAttachableId,
    AttachmentFamilyId,
    AttachmentSort,
    AttachmentAlt,
    AttachmentTitle,
    AttachmentDescription,
    AttachmentExcerpt,
    AttachmentName,
    AttachmentPathname,
    AttachmentFilename,
    AttachmentUrl,
    AttachmentMime,
    AttachmentExtension,
    AttachmentSize,
    AttachmentWidth,
    AttachmentHeight,
    AttachmentLibraryId,
    AttachmentLibraryFilename,
    AttachmentData,
    AttachmentCreatedAt,
    AttachmentUpdatedAt,
    AttachmentDeletedAt,
} from './../../domain/value-objects';

@CommandHandler(CreateAttachmentsCommand)
export class CreateAttachmentsCommandHandler implements ICommandHandler<CreateAttachmentsCommand>
{
    constructor(
        private readonly createAttachmentsService: CreateAttachmentsService,
    ) {}

    async execute(command: CreateAttachmentsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAttachmentsService.main(
            command.payload
                .map(attachment => {
                    return {
                        id: new AttachmentId(attachment.id),
                        commonId: new AttachmentCommonId(attachment.commonId),
                        langId: new AttachmentLangId(attachment.langId),
                        attachableModel: new AttachmentAttachableModel(attachment.attachableModel),
                        attachableId: new AttachmentAttachableId(attachment.attachableId),
                        familyId: new AttachmentFamilyId(attachment.familyId),
                        sort: new AttachmentSort(attachment.sort),
                        alt: new AttachmentAlt(attachment.alt),
                        title: new AttachmentTitle(attachment.title),
                        description: new AttachmentDescription(attachment.description),
                        excerpt: new AttachmentExcerpt(attachment.excerpt),
                        name: new AttachmentName(attachment.name),
                        pathname: new AttachmentPathname(attachment.pathname),
                        filename: new AttachmentFilename(attachment.filename),
                        url: new AttachmentUrl(attachment.url),
                        mime: new AttachmentMime(attachment.mime),
                        extension: new AttachmentExtension(attachment.extension),
                        size: new AttachmentSize(attachment.size),
                        width: new AttachmentWidth(attachment.width),
                        height: new AttachmentHeight(attachment.height),
                        libraryId: new AttachmentLibraryId(attachment.libraryId),
                        libraryFilename: new AttachmentLibraryFilename(attachment.libraryFilename),
                        data: new AttachmentData(attachment.data),
                    }
                })
        );
    }
}