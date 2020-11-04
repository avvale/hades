import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedChannelOverviewEvent } from './updated-channel-overview.event';

@EventsHandler(UpdatedChannelOverviewEvent)
export class UpdatedChannelOverviewEventHandler implements IEventHandler<UpdatedChannelOverviewEvent>
{
    handle(event: UpdatedChannelOverviewEvent)
    {
        // console.log('UpdatedChannelOverviewEvent: ', event);
    }
}