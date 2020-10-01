import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedChannelsDetailEvent } from './created-channels-detail.event';

@EventsHandler(CreatedChannelsDetailEvent)
export class CreatedChannelsDetailEventHandler implements IEventHandler<CreatedChannelsDetailEvent>
{
    handle(event: CreatedChannelsDetailEvent) 
    {
        // console.log('CreatedChannelsDetailEvent: ', event);
    }
}