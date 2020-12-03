import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedPartnersEvent } from './deleted-partners.event';

@EventsHandler(DeletedPartnersEvent)
export class DeletedPartnersEventHandler implements IEventHandler<DeletedPartnersEvent>
{
    handle(event: DeletedPartnersEvent)
    {
        // console.log('DeletedPartnersEvent: ', event);
    }
}