import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedChannelsEvent } from './created-channels.event';

@EventsHandler(CreatedChannelsEvent)
export class CreatedChannelsEventHandler implements IEventHandler<CreatedChannelsEvent>
{
    handle(event: CreatedChannelsEvent) 
    {
        // console.log('CreatedChannelsEvent: ', event);
    }
}