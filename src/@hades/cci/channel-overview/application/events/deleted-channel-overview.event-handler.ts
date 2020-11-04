import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedChannelOverviewEvent } from './deleted-channel-overview.event';

@EventsHandler(DeletedChannelOverviewEvent)
export class DeletedChannelOverviewEventHandler implements IEventHandler<DeletedChannelOverviewEvent>
{
    handle(event: DeletedChannelOverviewEvent)
    {
        // console.log('DeletedChannelOverviewEvent: ', event);
    }
}