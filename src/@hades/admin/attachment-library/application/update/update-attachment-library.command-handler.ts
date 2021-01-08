import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAttachmentLibraryCommand } from './update-attachment-library.command';
import { UpdateAttachmentLibraryService } from './update-attachment-library.service';
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

@CommandHandler(UpdateAttachmentLibraryCommand)
export class UpdateAttachmentLibraryCommandHandler implements ICommandHandler<UpdateAttachmentLibraryCommand>
{
    constructor(
        private readonly updateAttachmentLibraryService: UpdateAttachmentLibraryService,
    ) {}

    async execute(command: UpdateAttachmentLibraryCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAttachmentLibraryService.main(
            {
                id: new AttachmentLibraryId(command.payload.id),
                name: new AttachmentLibraryName(command.payload.name),
                pathname: new AttachmentLibraryPathname(command.payload.pathname, { undefinable: true }),
                filename: new AttachmentLibraryFilename(command.payload.filename, { undefinable: true }),
                url: new AttachmentLibraryUrl(command.payload.url, { undefinable: true }),
                mime: new AttachmentLibraryMime(command.payload.mime, { undefinable: true }),
                extension: new AttachmentLibraryExtension(command.payload.extension),
                size: new AttachmentLibrarySize(command.payload.size, { undefinable: true }),
                width: new AttachmentLibraryWidth(command.payload.width),
                height: new AttachmentLibraryHeight(command.payload.height),
                data: new AttachmentLibraryData(command.payload.data),
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}