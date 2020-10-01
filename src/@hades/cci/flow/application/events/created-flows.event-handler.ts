import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedFlowsEvent } from './created-flows.event';

@EventsHandler(CreatedFlowsEvent)
export class CreatedFlowsEventHandler implements IEventHandler<CreatedFlowsEvent>
{
    handle(event: CreatedFlowsEvent) 
    {
        // console.log('CreatedFlowsEvent: ', event);
    }
}