import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedSessionEvent } from './deleted-session.event';

@EventsHandler(DeletedSessionEvent)
export class DeletedSessionEventHandler implements IEventHandler<DeletedSessionEvent>
{
    handle(event: DeletedSessionEvent) 
    {
        // console.log('DeletedSessionEvent: ', event);
    }
}