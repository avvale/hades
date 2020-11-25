import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedAttachmentFamilyEvent } from './created-attachment-family.event';

@EventsHandler(CreatedAttachmentFamilyEvent)
export class CreatedAttachmentFamilyEventHandler implements IEventHandler<CreatedAttachmentFamilyEvent>
{
    handle(event: CreatedAttachmentFamilyEvent)
    {
        // console.log('CreatedAttachmentFamilyEvent: ', event);
    }
}