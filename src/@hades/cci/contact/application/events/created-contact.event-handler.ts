import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedContactEvent } from './created-contact.event';

@EventsHandler(CreatedContactEvent)
export class CreatedContactEventHandler implements IEventHandler<CreatedContactEvent>
{
    handle(event: CreatedContactEvent)
    {
        // console.log('CreatedContactEvent: ', event);
    }
}