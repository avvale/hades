import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedSessionsEvent } from './deleted-sessions.event';

@EventsHandler(DeletedSessionsEvent)
export class DeletedSessionsEventHandler implements IEventHandler<DeletedSessionsEvent>
{
    handle(event: DeletedSessionsEvent) 
    {
        // console.log('DeletedSessionsEvent: ', event);
    }
}