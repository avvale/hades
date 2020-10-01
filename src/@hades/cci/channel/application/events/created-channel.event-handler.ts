import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedChannelEvent } from './created-channel.event';

@EventsHandler(CreatedChannelEvent)
export class CreatedChannelEventHandler implements IEventHandler<CreatedChannelEvent>
{
    handle(event: CreatedChannelEvent) 
    {
        // console.log('CreatedChannelEvent: ', event);
    }
}