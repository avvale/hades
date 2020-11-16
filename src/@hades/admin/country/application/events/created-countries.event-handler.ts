import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedCountriesEvent } from './created-countries.event';

@EventsHandler(CreatedCountriesEvent)
export class CreatedCountriesEventHandler implements IEventHandler<CreatedCountriesEvent>
{
    handle(event: CreatedCountriesEvent)
    {
        // console.log('CreatedCountriesEvent: ', event);
    }
}