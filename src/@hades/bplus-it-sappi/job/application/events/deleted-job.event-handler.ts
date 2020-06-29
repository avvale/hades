import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedJobEvent } from './deleted-job.event';

@EventsHandler(DeletedJobEvent)
export class DeletedJobEventHandler implements IEventHandler<DeletedJobEvent>
{
    handle(event: DeletedJobEvent) 
    {
        // console.log('DeletedJobEvent: ', event);
    }
}