import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedJobEvent } from './updated-job.event';

@EventsHandler(UpdatedJobEvent)
export class UpdatedJobEventHandler implements IEventHandler<UpdatedJobEvent>
{
    handle(event: UpdatedJobEvent) 
    {
        // console.log('UpdatedJobEvent: ', event);
    }
}