import { CreatedAttachmentFamilyEvent } from './created-attachment-family.event';

export class CreatedAttachmentFamiliesEvent
{
    constructor(
        public readonly attachmentFamilies: CreatedAttachmentFamilyEvent[],
    ) {}
}