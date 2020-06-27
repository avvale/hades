import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedExecutionEvent } from './updated-execution.event';

@EventsHandler(UpdatedExecutionEvent)
export class UpdatedExecutionEventHandler implements IEventHandler<UpdatedExecutionEvent>
{
    handle(event: UpdatedExecutionEvent) 
    {
        // console.log('UpdatedExecutionEvent: ', event);
    }
}