import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedDataLakeEvent } from './created-data-lake.event';

@EventsHandler(CreatedDataLakeEvent)
export class CreatedDataLakeEventHandler implements IEventHandler<CreatedDataLakeEvent>
{
    handle(event: CreatedDataLakeEvent) 
    {
        // console.log('CreatedDataLakeEvent: ', event);
    }
}