import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedJobDetailEvent } from './updated-job-detail.event';

@EventsHandler(UpdatedJobDetailEvent)
export class UpdatedJobDetailEventHandler implements IEventHandler<UpdatedJobDetailEvent>
{
    handle(event: UpdatedJobDetailEvent)
    {
        // console.log('UpdatedJobDetailEvent: ', event);
    }
}