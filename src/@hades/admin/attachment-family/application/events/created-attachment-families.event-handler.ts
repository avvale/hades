import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedAttachmentFamiliesEvent } from './created-attachment-families.event';

@EventsHandler(CreatedAttachmentFamiliesEvent)
export class CreatedAttachmentFamiliesEventHandler implements IEventHandler<CreatedAttachmentFamiliesEvent>
{
    handle(event: CreatedAttachmentFamiliesEvent)
    {
        // console.log('CreatedAttachmentFamiliesEvent: ', event);
    }
}