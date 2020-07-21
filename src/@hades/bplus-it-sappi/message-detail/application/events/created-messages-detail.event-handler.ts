import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedMessagesDetailEvent } from './created-messages-detail.event';

@EventsHandler(CreatedMessagesDetailEvent)
export class CreatedMessagesDetailEventHandler implements IEventHandler<CreatedMessagesDetailEvent>
{
    handle(event: CreatedMessagesDetailEvent) 
    {
        // console.log('CreatedMessagesDetailEvent: ', event);
    }
}