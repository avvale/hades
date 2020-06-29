import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedDataLakeEvent } from './updated-data-lake.event';

@EventsHandler(UpdatedDataLakeEvent)
export class UpdatedDataLakeEventHandler implements IEventHandler<UpdatedDataLakeEvent>
{
    handle(event: UpdatedDataLakeEvent) 
    {
        // console.log('UpdatedDataLakeEvent: ', event);
    }
}