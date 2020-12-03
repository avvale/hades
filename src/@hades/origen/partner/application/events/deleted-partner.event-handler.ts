import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedPartnerEvent } from './deleted-partner.event';

@EventsHandler(DeletedPartnerEvent)
export class DeletedPartnerEventHandler implements IEventHandler<DeletedPartnerEvent>
{
    handle(event: DeletedPartnerEvent)
    {
        // console.log('DeletedPartnerEvent: ', event);
    }
}