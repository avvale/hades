import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedMessageDetailEvent } from './created-message-detail.event';

@EventsHandler(CreatedMessageDetailEvent)
export class CreatedMessageDetailEventHandler implements IEventHandler<CreatedMessageDetailEvent>
{
    handle(event: CreatedMessageDetailEvent)
    {
        // console.log('CreatedMessageDetailEvent: ', event);
    }
}