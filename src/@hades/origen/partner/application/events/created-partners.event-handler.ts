import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedPartnersEvent } from './created-partners.event';

@EventsHandler(CreatedPartnersEvent)
export class CreatedPartnersEventHandler implements IEventHandler<CreatedPartnersEvent>
{
    handle(event: CreatedPartnersEvent)
    {
        // console.log('CreatedPartnersEvent: ', event);
    }
}