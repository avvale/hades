import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedJobEvent } from './created-job.event';

@EventsHandler(CreatedJobEvent)
export class CreatedJobEventHandler implements IEventHandler<CreatedJobEvent>
{
    handle(event: CreatedJobEvent) 
    {
        // console.log('CreatedJobEvent: ', event);
    }
}