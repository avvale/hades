import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedMessagesOverviewEvent } from './created-messages-overview.event';

@EventsHandler(CreatedMessagesOverviewEvent)
export class CreatedMessagesOverviewEventHandler implements IEventHandler<CreatedMessagesOverviewEvent>
{
    handle(event: CreatedMessagesOverviewEvent)
    {
        // console.log('CreatedMessagesOverviewEvent: ', event);
    }
}