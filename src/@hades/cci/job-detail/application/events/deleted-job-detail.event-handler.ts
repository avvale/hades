import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedJobDetailEvent } from './deleted-job-detail.event';

@EventsHandler(DeletedJobDetailEvent)
export class DeletedJobDetailEventHandler implements IEventHandler<DeletedJobDetailEvent>
{
    handle(event: DeletedJobDetailEvent)
    {
        // console.log('DeletedJobDetailEvent: ', event);
    }
}