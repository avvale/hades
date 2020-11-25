import { DeletedAttachmentEvent } from './deleted-attachment.event';

export class DeletedAttachmentsEvent
{
    constructor(
        public readonly attachments: DeletedAttachmentEvent[],
    ) {}
}