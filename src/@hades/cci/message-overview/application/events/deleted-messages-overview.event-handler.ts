import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedMessagesOverviewEvent } from './deleted-messages-overview.event';

@EventsHandler(DeletedMessagesOverviewEvent)
export class DeletedMessagesOverviewEventHandler implements IEventHandler<DeletedMessagesOverviewEvent>
{
    handle(event: DeletedMessagesOverviewEvent)
    {
        // console.log('DeletedMessagesOverviewEvent: ', event);
    }
}