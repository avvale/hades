import { DeletedAttachmentFamilyEvent } from './deleted-attachment-family.event';

export class DeletedAttachmentFamiliesEvent
{
    constructor(
        public readonly attachmentFamilies: DeletedAttachmentFamilyEvent[],
    ) {}
}