import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAttachmentCommand } from './create-attachment.command';
import { CreateAttachmentService } from './create-attachment.service';
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

@CommandHandler(CreateAttachmentCommand)
export class CreateAttachmentCommandHandler implements ICommandHandler<CreateAttachmentCommand>
{
    constructor(
        private readonly createAttachmentService: CreateAttachmentService,
    ) {}

    async execute(command: CreateAttachmentCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAttachmentService.main(
            {
                id: new AttachmentId(command.payload.id),
                commonId: new AttachmentCommonId(command.payload.commonId),
                langId: new AttachmentLangId(command.payload.langId),
                attachableModel: new AttachmentAttachableModel(command.payload.attachableModel),
                attachableId: new AttachmentAttachableId(command.payload.attachableId),
                familyId: new AttachmentFamilyId(command.payload.familyId),
                sort: new AttachmentSort(command.payload.sort),
                alt: new AttachmentAlt(command.payload.alt),
                title: new AttachmentTitle(command.payload.title),
                description: new AttachmentDescription(command.payload.description),
                excerpt: new AttachmentExcerpt(command.payload.excerpt),
                pathname: new AttachmentPathname(command.payload.pathname),
                filename: new AttachmentFilename(command.payload.filename),
                url: new AttachmentUrl(command.payload.url),
                mime: new AttachmentMime(command.payload.mime),
                extension: new AttachmentExtension(command.payload.extension),
                size: new AttachmentSize(command.payload.size),
                width: new AttachmentWidth(command.payload.width),
                height: new AttachmentHeight(command.payload.height),
                libraryId: new AttachmentLibraryId(command.payload.libraryId),
                libraryFilename: new AttachmentLibraryFilename(command.payload.libraryFilename),
                data: new AttachmentData(command.payload.data),
            }
        );
    }
}