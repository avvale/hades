import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedAttachmentsEvent } from './deleted-attachments.event';

@EventsHandler(DeletedAttachmentsEvent)
export class DeletedAttachmentsEventHandler implements IEventHandler<DeletedAttachmentsEvent>
{
    handle(event: DeletedAttachmentsEvent)
    {
        // console.log('DeletedAttachmentsEvent: ', event);
    }
}