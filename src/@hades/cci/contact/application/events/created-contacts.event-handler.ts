import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedContactsEvent } from './created-contacts.event';

@EventsHandler(CreatedContactsEvent)
export class CreatedContactsEventHandler implements IEventHandler<CreatedContactsEvent>
{
    handle(event: CreatedContactsEvent) 
    {
        // console.log('CreatedContactsEvent: ', event);
    }
}