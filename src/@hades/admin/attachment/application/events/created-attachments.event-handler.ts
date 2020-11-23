import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedAttachmentsEvent } from './created-attachments.event';

@EventsHandler(CreatedAttachmentsEvent)
export class CreatedAttachmentsEventHandler implements IEventHandler<CreatedAttachmentsEvent>
{
    handle(event: CreatedAttachmentsEvent)
    {
        // console.log('CreatedAttachmentsEvent: ', event);
    }
}