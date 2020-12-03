import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedPartnerEvent } from './created-partner.event';

@EventsHandler(CreatedPartnerEvent)
export class CreatedPartnerEventHandler implements IEventHandler<CreatedPartnerEvent>
{
    handle(event: CreatedPartnerEvent)
    {
        // console.log('CreatedPartnerEvent: ', event);
    }
}