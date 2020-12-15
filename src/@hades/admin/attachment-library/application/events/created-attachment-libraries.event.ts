import { CreatedAttachmentLibraryEvent } from './created-attachment-library.event';

export class CreatedAttachmentLibrariesEvent
{
    constructor(
        public readonly attachmentLibraries: CreatedAttachmentLibraryEvent[],
    ) {}
}