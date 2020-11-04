import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedJobsOverviewEvent } from './deleted-jobs-overview.event';

@EventsHandler(DeletedJobsOverviewEvent)
export class DeletedJobsOverviewEventHandler implements IEventHandler<DeletedJobsOverviewEvent>
{
    handle(event: DeletedJobsOverviewEvent)
    {
        // console.log('DeletedJobsOverviewEvent: ', event);
    }
}