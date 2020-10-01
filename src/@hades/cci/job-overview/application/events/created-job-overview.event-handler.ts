import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedJobOverviewEvent } from './created-job-overview.event';

@EventsHandler(CreatedJobOverviewEvent)
export class CreatedJobOverviewEventHandler implements IEventHandler<CreatedJobOverviewEvent>
{
    handle(event: CreatedJobOverviewEvent) 
    {
        // console.log('CreatedJobOverviewEvent: ', event);
    }
}