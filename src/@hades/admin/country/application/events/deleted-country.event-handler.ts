import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedCountryEvent } from './deleted-country.event';

@EventsHandler(DeletedCountryEvent)
export class DeletedCountryEventHandler implements IEventHandler<DeletedCountryEvent>
{
    handle(event: DeletedCountryEvent)
    {
        // console.log('DeletedCountryEvent: ', event);
    }
}