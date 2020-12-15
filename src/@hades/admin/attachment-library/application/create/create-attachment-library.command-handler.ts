import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAttachmentLibraryCommand } from './create-attachment-library.command';
import { CreateAttachmentLibraryService } from './create-attachment-library.service';
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

@CommandHandler(CreateAttachmentLibraryCommand)
export class CreateAttachmentLibraryCommandHandler implements ICommandHandler<CreateAttachmentLibraryCommand>
{
    constructor(
        private readonly createAttachmentLibraryService: CreateAttachmentLibraryService,
    ) {}

    async execute(command: CreateAttachmentLibraryCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAttachmentLibraryService.main(
            {
                id: new AttachmentLibraryId(command.payload.id),
                name: new AttachmentLibraryName(command.payload.name),
                pathname: new AttachmentLibraryPathname(command.payload.pathname),
                filename: new AttachmentLibraryFilename(command.payload.filename),
                url: new AttachmentLibraryUrl(command.payload.url),
                mime: new AttachmentLibraryMime(command.payload.mime),
                extension: new AttachmentLibraryExtension(command.payload.extension),
                size: new AttachmentLibrarySize(command.payload.size),
                width: new AttachmentLibraryWidth(command.payload.width),
                height: new AttachmentLibraryHeight(command.payload.height),
                data: new AttachmentLibraryData(command.payload.data),
            }
        );
    }
}