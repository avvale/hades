import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedJobDetailEvent } from './created-job-detail.event';

@EventsHandler(CreatedJobDetailEvent)
export class CreatedJobDetailEventHandler implements IEventHandler<CreatedJobDetailEvent>
{
    handle(event: CreatedJobDetailEvent) 
    {
        // console.log('CreatedJobDetailEvent: ', event);
    }
}