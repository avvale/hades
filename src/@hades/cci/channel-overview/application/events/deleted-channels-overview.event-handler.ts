import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedChannelsOverviewEvent } from './deleted-channels-overview.event';

@EventsHandler(DeletedChannelsOverviewEvent)
export class DeletedChannelsOverviewEventHandler implements IEventHandler<DeletedChannelsOverviewEvent>
{
    handle(event: DeletedChannelsOverviewEvent) 
    {
        // console.log('DeletedChannelsOverviewEvent: ', event);
    }
}