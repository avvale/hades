import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedJobsDetailEvent } from './deleted-jobs-detail.event';

@EventsHandler(DeletedJobsDetailEvent)
export class DeletedJobsDetailEventHandler implements IEventHandler<DeletedJobsDetailEvent>
{
    handle(event: DeletedJobsDetailEvent) 
    {
        // console.log('DeletedJobsDetailEvent: ', event);
    }
}