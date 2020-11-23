import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedAttachmentEvent } from './updated-attachment.event';

@EventsHandler(UpdatedAttachmentEvent)
export class UpdatedAttachmentEventHandler implements IEventHandler<UpdatedAttachmentEvent>
{
    handle(event: UpdatedAttachmentEvent)
    {
        // console.log('UpdatedAttachmentEvent: ', event);
    }
}