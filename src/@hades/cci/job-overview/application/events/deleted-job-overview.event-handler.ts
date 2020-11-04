import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedJobOverviewEvent } from './deleted-job-overview.event';

@EventsHandler(DeletedJobOverviewEvent)
export class DeletedJobOverviewEventHandler implements IEventHandler<DeletedJobOverviewEvent>
{
    handle(event: DeletedJobOverviewEvent)
    {
        // console.log('DeletedJobOverviewEvent: ', event);
    }
}