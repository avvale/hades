import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedAttachmentEvent } from './deleted-attachment.event';

@EventsHandler(DeletedAttachmentEvent)
export class DeletedAttachmentEventHandler implements IEventHandler<DeletedAttachmentEvent>
{
    handle(event: DeletedAttachmentEvent)
    {
        // console.log('DeletedAttachmentEvent: ', event);
    }
}