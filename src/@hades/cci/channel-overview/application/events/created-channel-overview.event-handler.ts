import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedChannelOverviewEvent } from './created-channel-overview.event';

@EventsHandler(CreatedChannelOverviewEvent)
export class CreatedChannelOverviewEventHandler implements IEventHandler<CreatedChannelOverviewEvent>
{
    handle(event: CreatedChannelOverviewEvent) 
    {
        // console.log('CreatedChannelOverviewEvent: ', event);
    }
}