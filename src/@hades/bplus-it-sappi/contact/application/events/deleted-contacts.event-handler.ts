import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedContactsEvent } from './deleted-contacts.event';

@EventsHandler(DeletedContactsEvent)
export class DeletedContactsEventHandler implements IEventHandler<DeletedContactsEvent>
{
    handle(event: DeletedContactsEvent) 
    {
        // console.log('DeletedContactsEvent: ', event);
    }
}