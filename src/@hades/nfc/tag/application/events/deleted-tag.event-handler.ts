import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedTagEvent } from './deleted-tag.event';

@EventsHandler(DeletedTagEvent)
export class DeletedTagEventHandler implements IEventHandler<DeletedTagEvent>
{
    handle(event: DeletedTagEvent) 
    {
        // console.log('DeletedTagEvent: ', event);
    }
}