import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedJobsOverviewEvent } from './created-jobs-overview.event';

@EventsHandler(CreatedJobsOverviewEvent)
export class CreatedJobsOverviewEventHandler implements IEventHandler<CreatedJobsOverviewEvent>
{
    handle(event: CreatedJobsOverviewEvent) 
    {
        // console.log('CreatedJobsOverviewEvent: ', event);
    }
}