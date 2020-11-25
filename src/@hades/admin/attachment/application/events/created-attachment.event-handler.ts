import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedAttachmentEvent } from './created-attachment.event';

@EventsHandler(CreatedAttachmentEvent)
export class CreatedAttachmentEventHandler implements IEventHandler<CreatedAttachmentEvent>
{
    handle(event: CreatedAttachmentEvent)
    {
        // console.log('CreatedAttachmentEvent: ', event);
    }
}