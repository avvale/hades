import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedChannelsOverviewEvent } from './created-channels-overview.event';

@EventsHandler(CreatedChannelsOverviewEvent)
export class CreatedChannelsOverviewEventHandler implements IEventHandler<CreatedChannelsOverviewEvent>
{
    handle(event: CreatedChannelsOverviewEvent)
    {
        // console.log('CreatedChannelsOverviewEvent: ', event);
    }
}