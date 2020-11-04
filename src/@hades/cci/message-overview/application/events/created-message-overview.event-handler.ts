import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedMessageOverviewEvent } from './created-message-overview.event';

@EventsHandler(CreatedMessageOverviewEvent)
export class CreatedMessageOverviewEventHandler implements IEventHandler<CreatedMessageOverviewEvent>
{
    handle(event: CreatedMessageOverviewEvent)
    {
        // console.log('CreatedMessageOverviewEvent: ', event);
    }
}