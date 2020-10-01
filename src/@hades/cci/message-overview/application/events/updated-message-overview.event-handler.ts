import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedMessageOverviewEvent } from './updated-message-overview.event';

@EventsHandler(UpdatedMessageOverviewEvent)
export class UpdatedMessageOverviewEventHandler implements IEventHandler<UpdatedMessageOverviewEvent>
{
    handle(event: UpdatedMessageOverviewEvent) 
    {
        // console.log('UpdatedMessageOverviewEvent: ', event);
    }
}