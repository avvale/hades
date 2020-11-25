import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAttachmentCommand } from './update-attachment.command';
import { UpdateAttachmentService } from './update-attachment.service';
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

@CommandHandler(UpdateAttachmentCommand)
export class UpdateAttachmentCommandHandler implements ICommandHandler<UpdateAttachmentCommand>
{
    constructor(
        private readonly updateAttachmentService: UpdateAttachmentService,
    ) {}

    async execute(command: UpdateAttachmentCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAttachmentService.main(
            {
                id: new AttachmentId(command.payload.id),
                commonId: new AttachmentCommonId(command.payload.commonId, { undefinable: true }),
                langId: new AttachmentLangId(command.payload.langId, { undefinable: true }),
                attachableModel: new AttachmentAttachableModel(command.payload.attachableModel, { undefinable: true }),
                attachableId: new AttachmentAttachableId(command.payload.attachableId, { undefinable: true }),
                familyId: new AttachmentFamilyId(command.payload.familyId),
                sort: new AttachmentSort(command.payload.sort),
                alt: new AttachmentAlt(command.payload.alt),
                title: new AttachmentTitle(command.payload.title),
                description: new AttachmentDescription(command.payload.description),
                excerpt: new AttachmentExcerpt(command.payload.excerpt),
                pathname: new AttachmentPathname(command.payload.pathname, { undefinable: true }),
                filename: new AttachmentFilename(command.payload.filename, { undefinable: true }),
                url: new AttachmentUrl(command.payload.url, { undefinable: true }),
                mime: new AttachmentMime(command.payload.mime, { undefinable: true }),
                extension: new AttachmentExtension(command.payload.extension),
                size: new AttachmentSize(command.payload.size, { undefinable: true }),
                width: new AttachmentWidth(command.payload.width),
                height: new AttachmentHeight(command.payload.height),
                libraryId: new AttachmentLibraryId(command.payload.libraryId),
                libraryFilename: new AttachmentLibraryFilename(command.payload.libraryFilename),
                data: new AttachmentData(command.payload.data),
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}