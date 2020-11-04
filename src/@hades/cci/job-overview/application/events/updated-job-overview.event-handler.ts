import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedJobOverviewEvent } from './updated-job-overview.event';

@EventsHandler(UpdatedJobOverviewEvent)
export class UpdatedJobOverviewEventHandler implements IEventHandler<UpdatedJobOverviewEvent>
{
    handle(event: UpdatedJobOverviewEvent)
    {
        // console.log('UpdatedJobOverviewEvent: ', event);
    }
}