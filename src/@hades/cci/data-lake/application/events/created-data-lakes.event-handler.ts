import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedDataLakesEvent } from './created-data-lakes.event';

@EventsHandler(CreatedDataLakesEvent)
export class CreatedDataLakesEventHandler implements IEventHandler<CreatedDataLakesEvent>
{
    handle(event: CreatedDataLakesEvent)
    {
        // console.log('CreatedDataLakesEvent: ', event);
    }
}