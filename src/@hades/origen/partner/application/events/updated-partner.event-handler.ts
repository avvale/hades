import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedPartnerEvent } from './updated-partner.event';

@EventsHandler(UpdatedPartnerEvent)
export class UpdatedPartnerEventHandler implements IEventHandler<UpdatedPartnerEvent>
{
    handle(event: UpdatedPartnerEvent)
    {
        // console.log('UpdatedPartnerEvent: ', event);
    }
}