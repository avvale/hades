import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedJobsDetailEvent } from './created-jobs-detail.event';

@EventsHandler(CreatedJobsDetailEvent)
export class CreatedJobsDetailEventHandler implements IEventHandler<CreatedJobsDetailEvent>
{
    handle(event: CreatedJobsDetailEvent)
    {
        // console.log('CreatedJobsDetailEvent: ', event);
    }
}