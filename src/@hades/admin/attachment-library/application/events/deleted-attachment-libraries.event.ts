import { DeletedAttachmentLibraryEvent } from './deleted-attachment-library.event';

export class DeletedAttachmentLibrariesEvent
{
    constructor(
        public readonly attachmentLibraries: DeletedAttachmentLibraryEvent[],
    ) {}
}