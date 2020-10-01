import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedMessageDetailEvent } from './deleted-message-detail.event';

@EventsHandler(DeletedMessageDetailEvent)
export class DeletedMessageDetailEventHandler implements IEventHandler<DeletedMessageDetailEvent>
{
    handle(event: DeletedMessageDetailEvent) 
    {
        // console.log('DeletedMessageDetailEvent: ', event);
    }
}