import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedContactEvent } from './deleted-contact.event';

@EventsHandler(DeletedContactEvent)
export class DeletedContactEventHandler implements IEventHandler<DeletedContactEvent>
{
    handle(event: DeletedContactEvent)
    {
        // console.log('DeletedContactEvent: ', event);
    }
}