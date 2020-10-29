import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedExecutionEvent } from './created-execution.event';

@EventsHandler(CreatedExecutionEvent)
export class CreatedExecutionEventHandler implements IEventHandler<CreatedExecutionEvent>
{
    handle(event: CreatedExecutionEvent)
    {
        // console.log('CreatedExecutionEvent: ', event);
    }
}