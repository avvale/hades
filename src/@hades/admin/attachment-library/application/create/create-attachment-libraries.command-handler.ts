import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAttachmentLibrariesCommand } from './create-attachment-libraries.command';
import { CreateAttachmentLibrariesService } from './create-attachment-libraries.service';
import {
    AttachmentLibraryId,
    AttachmentLibraryName,
    AttachmentLibraryPathname,
    AttachmentLibraryFilename,
    AttachmentLibraryUrl,
    AttachmentLibraryMime,
    AttachmentLibraryExtension,
    AttachmentLibrarySize,
    AttachmentLibraryWidth,
    AttachmentLibraryHeight,
    AttachmentLibraryData,
    AttachmentLibraryCreatedAt,
    AttachmentLibraryUpdatedAt,
    AttachmentLibraryDeletedAt,
} from './../../domain/value-objects';

@CommandHandler(CreateAttachmentLibrariesCommand)
export class CreateAttachmentLibrariesCommandHandler implements ICommandHandler<CreateAttachmentLibrariesCommand>
{
    constructor(
        private readonly createAttachmentLibrariesService: CreateAttachmentLibrariesService,
    ) {}

    async execute(command: CreateAttachmentLibrariesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAttachmentLibrariesService.main(
            command.payload
                .map(attachmentLibrary => {
                    return {
                        id: new AttachmentLibraryId(attachmentLibrary.id),
                        name: new AttachmentLibraryName(attachmentLibrary.name),
                        pathname: new AttachmentLibraryPathname(attachmentLibrary.pathname),
                        filename: new AttachmentLibraryFilename(attachmentLibrary.filename),
                        url: new AttachmentLibraryUrl(attachmentLibrary.url),
                        mime: new AttachmentLibraryMime(attachmentLibrary.mime),
                        extension: new AttachmentLibraryExtension(attachmentLibrary.extension),
                        size: new AttachmentLibrarySize(attachmentLibrary.size),
                        width: new AttachmentLibraryWidth(attachmentLibrary.width),
                        height: new AttachmentLibraryHeight(attachmentLibrary.height),
                        data: new AttachmentLibraryData(attachmentLibrary.data),
                    }
                })
        );
    }
}