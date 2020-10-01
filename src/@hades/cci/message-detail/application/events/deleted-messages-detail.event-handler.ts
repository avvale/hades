import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedMessagesDetailEvent } from './deleted-messages-detail.event';

@EventsHandler(DeletedMessagesDetailEvent)
export class DeletedMessagesDetailEventHandler implements IEventHandler<DeletedMessagesDetailEvent>
{
    handle(event: DeletedMessagesDetailEvent) 
    {
        // console.log('DeletedMessagesDetailEvent: ', event);
    }
}