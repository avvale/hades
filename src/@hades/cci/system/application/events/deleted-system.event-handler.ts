import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedSystemEvent } from './deleted-system.event';

@EventsHandler(DeletedSystemEvent)
export class DeletedSystemEventHandler implements IEventHandler<DeletedSystemEvent>
{
    handle(event: DeletedSystemEvent) 
    {
        // console.log('DeletedSystemEvent: ', event);
    }
}