import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedChannelDetailEvent } from './created-channel-detail.event';

@EventsHandler(CreatedChannelDetailEvent)
export class CreatedChannelDetailEventHandler implements IEventHandler<CreatedChannelDetailEvent>
{
    handle(event: CreatedChannelDetailEvent) 
    {
        // console.log('CreatedChannelDetailEvent: ', event);
    }
}