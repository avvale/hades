import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedExecutionsEvent } from './deleted-executions.event';

@EventsHandler(DeletedExecutionsEvent)
export class DeletedExecutionsEventHandler implements IEventHandler<DeletedExecutionsEvent>
{
    handle(event: DeletedExecutionsEvent) 
    {
        // console.log('DeletedExecutionsEvent: ', event);
    }
}