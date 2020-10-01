import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedMessageOverviewEvent } from './deleted-message-overview.event';

@EventsHandler(DeletedMessageOverviewEvent)
export class DeletedMessageOverviewEventHandler implements IEventHandler<DeletedMessageOverviewEvent>
{
    handle(event: DeletedMessageOverviewEvent) 
    {
        // console.log('DeletedMessageOverviewEvent: ', event);
    }
}