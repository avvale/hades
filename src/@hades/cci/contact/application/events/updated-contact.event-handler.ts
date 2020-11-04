import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedContactEvent } from './updated-contact.event';

@EventsHandler(UpdatedContactEvent)
export class UpdatedContactEventHandler implements IEventHandler<UpdatedContactEvent>
{
    handle(event: UpdatedContactEvent)
    {
        // console.log('UpdatedContactEvent: ', event);
    }
}