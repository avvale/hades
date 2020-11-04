import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedSystemsEvent } from './deleted-systems.event';

@EventsHandler(DeletedSystemsEvent)
export class DeletedSystemsEventHandler implements IEventHandler<DeletedSystemsEvent>
{
    handle(event: DeletedSystemsEvent)
    {
        // console.log('DeletedSystemsEvent: ', event);
    }
}