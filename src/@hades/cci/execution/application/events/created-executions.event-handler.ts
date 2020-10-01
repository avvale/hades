import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedExecutionsEvent } from './created-executions.event';

@EventsHandler(CreatedExecutionsEvent)
export class CreatedExecutionsEventHandler implements IEventHandler<CreatedExecutionsEvent>
{
    handle(event: CreatedExecutionsEvent) 
    {
        // console.log('CreatedExecutionsEvent: ', event);
    }
}