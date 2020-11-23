import { CreatedAttachmentEvent } from './created-attachment.event';

export class CreatedAttachmentsEvent
{
    constructor(
        public readonly attachments: CreatedAttachmentEvent[],
    ) {}
}