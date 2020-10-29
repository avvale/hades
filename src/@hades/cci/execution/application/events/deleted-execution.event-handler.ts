import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedExecutionEvent } from './deleted-execution.event';

@EventsHandler(DeletedExecutionEvent)
export class DeletedExecutionEventHandler implements IEventHandler<DeletedExecutionEvent>
{
    handle(event: DeletedExecutionEvent)
    {
        // console.log('DeletedExecutionEvent: ', event);
    }
}